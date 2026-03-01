import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/app/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || ''
    const token = cookie
      .split(';')
      .find((c) => c.trim().startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const decoded: any = verifyToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ user: null })
  }
}
