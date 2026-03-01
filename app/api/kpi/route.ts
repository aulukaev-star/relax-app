import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const employees = await prisma.employee.findMany({
    include: {
      events: {
        include: {
          event: {
            include: {
              finances: true
            }
          }
        }
      }
    }
  })

  const result = employees.map(emp => {
    let income = 0

    emp.events.forEach(rel => {
      rel.event.finances.forEach(fin => {
        if (fin.type === "income") {
          income += fin.amount
        }
      })
    })

    return {
      name: emp.name,
      income,
      events: emp.events.length
    }
  })

  return NextResponse.json(result)
}
