import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const employees = await prisma.employee.findMany()
  return NextResponse.json(employees)
}

export async function POST(req: Request) {
  const body = await req.json()

  const employee = await prisma.employee.create({
    data: body,
  })

  return NextResponse.json(employee)
}
