"use client"

import { useEffect, useState } from "react"

export default function EventDetails({ params }: any) {
  const [event, setEvent] = useState<any>(null)
  const [employees, setEmployees] = useState<any[]>([])

  const [financeTitle, setFinanceTitle] = useState("")
  const [financeAmount, setFinanceAmount] = useState("")
  const [financeType, setFinanceType] = useState("income")

  const [employeeId, setEmployeeId] = useState("")
  const [role, setRole] = useState("")
  const [managerId, setManagerId] = useState("")

  const load = () => {
    fetch(`/api/events/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data)
        setManagerId(data.managerId || "")
      })

    fetch("/api/employees")
      .then(res => res.json())
      .then(setEmployees)
  }

  useEffect(() => {
    load()
  }, [])

  if (!event) return <div className="p-6">Loading...</div>

  const addFinance = async () => {
    await fetch("/api/finances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: financeTitle,
        amount: Number(financeAmount),
        type: financeType,
        eventId: params.id,
      }),
    })

    setFinanceTitle("")
    setFinanceAmount("")
    load()
  }

  const addEmployee = async () => {
    if (!employeeId) return

    await fetch("/api/event-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: params.id,
        employeeId,
        role,
      }),
    })

    setEmployeeId("")
    setRole("")
    load()
  }

  const setManager = async () => {
    await fetch(`/api/events/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        managerId,
      }),
    })

    load()
  }

  const income =
    event.finances?.filter((f: any) => f.type === "income")
      .reduce((s: number, f: any) => s + f.amount, 0) || 0

  const expense =
    event.finances?.filter((f: any) => f.type === "expense")
      .reduce((s: number, f: any) => s + f.amount, 0) || 0

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">{event.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ФИНАНСЫ */}
        <div className="border p-4 rounded space-y-3">
          <h2 className="font-bold">Финансы</h2>

          <div>Доход: {income}</div>
          <div>Расход: {expense}</div>
          <div>Прибыль: {income - expense}</div>

          <input
            className="border p-2 w-full"
            placeholder="Название"
            value={financeTitle}
            onChange={e => setFinanceTitle(e.target.value)}
          />

          <input
            className="border p-2 w-full"
            placeholder="Сумма"
            value={financeAmount}
            onChange={e => setFinanceAmount(e.target.value)}
          />

          <select
            className="border p-2 w-full"
            value={financeType}
            onChange={e => setFinanceType(e.target.value)}
          >
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addFinance}
          >
            Добавить
          </button>

          <div className="space-y-1 pt-2">
            {event.finances?.map((f: any) => (
              <div key={f.id} className="border p-2 rounded">
                {f.title} — {f.amount} ({f.type})
              </div>
            ))}
          </div>
        </div>


        {/* МЕНЕДЖЕР */}
        <div className="border p-4 rounded space-y-3">
          <h2 className="font-bold">Менеджер события</h2>

          <select
            className="border p-2 w-full"
            value={managerId}
            onChange={e => setManagerId(e.target.value)}
          >
            <option value="">Выбрать менеджера</option>
            {employees.map((emp: any) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={setManager}
          >
            Назначить менеджера
          </button>

          <div>
            Текущий: {event.manager?.name || "не назначен"}
          </div>
        </div>


        {/* СОТРУДНИКИ */}
        <div className="border p-4 rounded space-y-3 md:col-span-2">
          <h2 className="font-bold">Сотрудники</h2>

          <select
            className="border p-2 w-full"
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
          >
            <option value="">Выбрать сотрудника</option>
            {employees.map((emp: any) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            className="border p-2 w-full"
            placeholder="Роль"
            value={role}
            onChange={e => setRole(e.target.value)}
          />

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={addEmployee}
          >
            Добавить сотрудника
          </button>

          <div className="space-y-1 pt-2">
            {event.employees?.map((rel: any) => (
              <div key={rel.id} className="border p-2 rounded">
                {rel.employee?.name} — {rel.role || "—"}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
