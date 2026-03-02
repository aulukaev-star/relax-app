import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { Event, Client } from "@prisma/client"

type EventWithClient = Event & { client: Client | null }

export async function GET() {
  const events = (await prisma.event.findMany({
    include: { client: true },
  })) as EventWithClient[]

  const calendar = events.map((e) => ({
    id: e.id,
    title: `${e.title} — ${e.client?.name ?? ""}`,
    start: e.date,
    end: e.date,
  }))

  return NextResponse.json(calendar)
}
