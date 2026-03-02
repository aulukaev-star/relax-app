import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type KPIEvent = {
  price: number
}

type KPIEmployee = {
  id: string | number
  name: string
  events: KPIEvent[]
}

export async function GET() {
  const employees = (await prisma.employee.findMany({
    include: {
      events: true,
    },
  })) as unknown as KPIEmployee[]

  const result = employees.map((emp: KPIEmployee) => {
    let income = 0

    emp.events.forEach((rel) => {
      income += rel.price
    })

    return {
      id: emp.id,
      name: emp.name,
      income,
    }
  })

  return NextResponse.json(result)
}
