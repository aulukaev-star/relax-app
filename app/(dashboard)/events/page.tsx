"use client"

import { useEffect, useState } from "react"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/events")
      const data = await res.json()
      setEvents(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">События</h1>

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="border p-4 rounded"
          >
            <div className="font-bold text-lg">
              {event.title}
            </div>

            <div>
              📅 {new Date(event.date).toLocaleString()}
            </div>

            <div>
              👤 Клиент: {event.client?.name || "—"}
            </div>

            <div>
              🏢 Площадка: {event.venue?.name || "—"}
            </div>

            <div>
              🧑‍💼 Менеджер: {event.manager?.name || "—"}
            </div>

            <a
              href={`/events/${event.id}`}
              className="text-blue-600 underline"
            >
              Открыть
            </a>
          </div>
        ))}
      </div>

    </div>
  )
}
