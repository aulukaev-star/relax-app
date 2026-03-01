"use client"

import { useEffect, useState } from "react"

export default function KPIPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/kpi")
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">KPI сотрудников</h1>

      {data.map(emp => (
        <div key={emp.id} className="border p-4 rounded">
          <div className="font-semibold">{emp.name}</div>
          <div>Событий: {emp.events}</div>
          <div>Доход: {emp.income}</div>
          <div>Прибыль: {emp.profit}</div>
        </div>
      ))}

    </div>
  )
}
