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

  const calendar = events.map((e: CalendarEvent) => ({
    id: e.id,
    title: `${e.title} — ${e.client?.name ?? ""}`,
    start: e.date,
    end: e.date,
  }))

  return NextResponse.json(calendar)
}
