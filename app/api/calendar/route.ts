import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"

type EventWithClient = Prisma.EventGetPayload<{
  include: { client: true }
}>

export async function GET() {
  const events = await prisma.event.findMany({
    include: { client: true },
  })

  const calendar = events.map((e: EventWithClient) => ({
    id: e.id,
    title: `${e.title} — ${e.client?.name || ""}`,
    start: e.date,
    end: e.date,
  }))

  return NextResponse.json(calendar)
}
