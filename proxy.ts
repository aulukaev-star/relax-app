import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/app/lib/auth"

type TokenPayload = {
  userId: string
}

function isTokenPayload(v: unknown): v is TokenPayload {
  if (!v || typeof v !== "object") return false
  const obj = v as Record<string, unknown>
  return typeof obj.userId === "string" && obj.userId.trim().length > 0
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) Всегда разрешаем Next static
  if (pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next()
  }

  // 2) Публичные страницы
  if (pathname === "/" || pathname.startsWith("/login")) {
    return NextResponse.next()
  }

  // 3) Публичные API (auth)
  if (
  pathname === "/api/auth/login" ||
  pathname === "/api/auth/logout" ||
  pathname === "/api/auth/me" ||
  pathname === "/api/health"
) {
  return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value

  // 4) Защита API: отдаём 401 JSON (НЕ redirect)
  if (pathname.startsWith("/api/")) {
    if (!token) {
      return NextResponse.json({ ok: false, error: "Unauthenticated" }, { status: 401 })
    }

    try {
      const decoded = verifyToken(token) as unknown
      if (!isTokenPayload(decoded)) {
        return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 })
      }

      // прокинем userId внутрь запросов (удобно использовать в route.ts)
      const headers = new Headers(req.headers)
      headers.set("x-user-id", decoded.userId)

      return NextResponse.next({ request: { headers } })
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 })
    }
  }

  // 5) Защита страниц: если нет токена — редирект на login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const decoded = verifyToken(token) as unknown
    if (!isTokenPayload(decoded)) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
