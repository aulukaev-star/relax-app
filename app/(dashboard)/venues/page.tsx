"use client"

import { useEffect, useState } from "react"

export default function VenuesPage() {
  const [venues, setVenues] = useState<any[]>([])
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  const load = () => {
    fetch("/api/venues")
      .then(res => res.json())
      .then(setVenues)
  }

  useEffect(() => {
    load()
  }, [])

  const create = async () => {
    await fetch("/api/venues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        address,
      }),
    })

    setName("")
    setAddress("")
    load()
  }

  return (
    <div>
      <h1>Площадки</h1>

      <input
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={create}>Добавить</button>

      <ul>
        {venues.map(v => (
          <li key={v.id}>
            {v.name} — {v.address}
          </li>
        ))}
      </ul>
    </div>
  )
}
