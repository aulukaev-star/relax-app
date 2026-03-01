import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const venues = await prisma.venue.findMany()
  return NextResponse.json(venues)
}

export async function POST(req: Request) {
  const body = await req.json()

  const venue = await prisma.venue.create({
    data: {
      name: body.name,
      address: body.address,
      notes: body.notes,
    },
  })

  return NextResponse.json(venue)
}
