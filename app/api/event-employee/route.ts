import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { eventId, employeeId, role } = body

    if (!eventId || !employeeId) {
      return NextResponse.json(
        { error: "Нет данных" },
        { status: 400 }
      )
    }

    const rel = await prisma.eventEmployee.create({
      data: {
        eventId,
        employeeId,
        role,
      },
    })

    return NextResponse.json(rel)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Ошибка добавления сотрудника" },
      { status: 500 }
    )
  }
}
