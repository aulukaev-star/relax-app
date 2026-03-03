import { NextResponse } from "next/server"

export async function POST() {
  try {
    const res = NextResponse.json(
      { ok: true, data: { message: "Logged out" } },
      { status: 200 }
    )

    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    })

    return res
  } catch (e) {
    console.error("POST /api/auth/logout error:", e)
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    )
  }
}
