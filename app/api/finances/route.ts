import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const finance = await prisma.finance.create({
    data: {
      title: body.title,
      amount: Number(body.amount),
      type: body.type,
      eventId: body.eventId,
    },
  })

  return NextResponse.json(finance)
}
