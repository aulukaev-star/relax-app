import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/app/lib/auth"
import { NextResponse } from "next/server"

type TokenPayload = {
  userId: string
}

type DbUserSafe = {
  id: string
  email: string
  role: string
}

function getCookieValue(cookieHeader: string, name: string): string | null {
  const parts = cookieHeader.split(";").map((p) => p.trim())
  const found = parts.find((p) => p.startsWith(`${name}=`))
  if (!found) return null
  const value = found.slice(name.length + 1)
  return value || null
}

function isTokenPayload(v: unknown): v is TokenPayload {
  if (!v || typeof v !== "object") return false
  const obj = v as Record<string, unknown>
  return typeof obj.userId === "string" && obj.userId.trim().length > 0
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") ?? ""
    const token = getCookieValue(cookieHeader, "token")

    if (!token) {
      return NextResponse.json({ ok: false, error: "Unauthenticated" }, { status: 401 })
    }

    const decodedUnknown = verifyToken(token) as unknown
    if (!isTokenPayload(decodedUnknown)) {
      return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 })
    }

    const user = (await prisma.user.findUnique({
      where: { id: decodedUnknown.userId },
      select: { id: true, email: true, role: true },
    })) as unknown as DbUserSafe | null

    if (!user) {
      return NextResponse.json({ ok: false, error: "User not found" }, { status: 401 })
    }

    return NextResponse.json({ ok: true, data: { user } }, { status: 200 })
  } catch (e) {
    console.error("GET /api/auth/me error:", e)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
