import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      client: true,
      venue: true,
      finances: true,
      manager: true,
      employees: {
        include: {
          employee: true,
        },
      },
    },
  })

  return NextResponse.json(event)
}



export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await req.json()

  const updated = await prisma.event.update({
    where: { id },
    data: {
      managerId: body.managerId || null,
      venueId: body.venueId || null,
    },
    include: {
      manager: true,
      venue: true,
    },
  })

  return NextResponse.json(updated)
}
