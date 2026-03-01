import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(clients)
}

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    )
  }

  const client = await prisma.client.create({
    data: {
      name: body.name,
      phone: body.phone || null,
      email: body.email || null,
    },
  })

  return NextResponse.json(client)
}
