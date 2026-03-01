"use client"

import { useEffect, useState } from "react"

export default function AssignPage() {
  const [events, setEvents] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])

  const [eventId, setEventId] = useState("")
  const [employeeId, setEmployeeId] = useState("")

  useEffect(() => {
    fetch("/api/events").then(res => res.json()).then(setEvents)
    fetch("/api/employees").then(res => res.json()).then(setEmployees)
  }, [])

  const assign = async () => {
    await fetch("/api/event-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        employeeId,
      }),
    })

    alert("Назначено")
  }

  return (
    <div>
      <h1>Назначить сотрудника на событие</h1>

      <select onChange={(e) => setEventId(e.target.value)}>
        <option>Выбрать событие</option>
        {events.map((e) => (
          <option key={e.id} value={e.id}>
            {e.title}
          </option>
        ))}
      </select>

      <select onChange={(e) => setEmployeeId(e.target.value)}>
        <option>Выбрать сотрудника</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>

      <button onClick={assign}>Назначить</button>
    </div>
  )
}
