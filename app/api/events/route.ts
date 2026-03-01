import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        client: true,
        venue: true,
        manager: true,   // ← менеджер события
        employees: {
          include: {
            employee: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Ошибка загрузки событий" },
      { status: 500 }
    )
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, date, location, notes, clientId, venueId } = body

    if (!title || !date) {
      return NextResponse.json(
        { error: "Название и дата обязательны" },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        location,
        notes,
        clientId: clientId || null,
        venueId: venueId || null,
      },
      include: {
        client: true,
        venue: true,
        manager: true,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Ошибка создания события" },
      { status: 500 }
    )
  }
}
