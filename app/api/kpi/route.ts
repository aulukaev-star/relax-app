import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type CalendarClient = { name?: string | null } | null

type CalendarEvent = {
  id: string | number
  title: string
  date: string | Date
  client?: CalendarClient
}

export async function GET() {
  const events = (await prisma.event.findMany({
    include: { client: true },
  })) as unknown as CalendarEvent[]

  const calendar = events.map((e: CalendarEvent) => {
    const clientName = e.client?.name?.trim()

    return {
      id: e.id,
      title: clientName ? `${e.title} — ${clientName}` : e.title,
      start: e.date,
      end: e.date,
    }
  })

  return NextResponse.json(calendar)
}
