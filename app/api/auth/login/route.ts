import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { signToken } from "@/app/lib/auth"
import { NextResponse } from "next/server"

type LoginBody = {
  email?: unknown
  password?: unknown
}

type DbUser = {
  id: string | number
  email: string
  role: string
  password: string
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody

    const email = isNonEmptyString(body.email) ? body.email.trim().toLowerCase() : ""
    const password = isNonEmptyString(body.password) ? body.password : ""

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = (await prisma.user.findUnique({
      where: { email },
      // можно ограничить выборку, если хочешь:
      // select: { id: true, email: true, role: true, password: true },
    })) as unknown as DbUser | null

    // Не раскрываем, что именно неверно
    if (!user) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })
    }

    const token = signToken({
      id: user.id,
      role: user.role,
      email: user.email,
    })

    const res = NextResponse.json({
      ok: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    })

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // maxAge: 60 * 60 * 24 * 7, // 7 дней (включи, если нужно)
    })

    return res
  } catch (e) {
    console.error("POST /api/auth/login error:", e)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
