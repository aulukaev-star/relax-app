"use client"

import { useEffect, useState } from "react"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [name, setName] = useState("")

  const load = () => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then(setEmployees)
  }

  useEffect(() => {
    load()
  }, [])

  const create = async () => {
    await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    setName("")
    load()
  }

  return (
    <div>
      <h1>Сотрудники</h1>

      <input
        placeholder="Имя сотрудника"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={create}>Добавить</button>

      <ul>
        {employees.map((e) => (
          <li key={e.id}>{e.name}</li>
        ))}
      </ul>
    </div>
  )
}
