"use client"

import { useEffect, useState } from "react"

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  async function loadClients() {
    const res = await fetch("/api/clients")
    const data = await res.json()
    setClients(data)
  }

  useEffect(() => {
    loadClients()
  }, [])

  async function createClient() {
    await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email }),
    })

    setName("")
    setPhone("")
    setEmail("")

    loadClients()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Клиенты</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <input
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <button onClick={createClient}>Добавить клиента</button>
      </div>

      <hr />

      {clients.map((c) => (
        <div key={c.id} style={{ marginBottom: 10 }}>
          <b>{c.name}</b> — {c.phone} — {c.email}
        </div>
      ))}
    </div>
  )
}
