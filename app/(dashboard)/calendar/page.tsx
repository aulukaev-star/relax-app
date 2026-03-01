"use client"

import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { useEffect, useState } from "react"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": require("date-fns/locale/en-US"),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((e: any) => ({
          title: e.title,
          start: new Date(e.date),
          end: new Date(e.date),
        }))
        setEvents(formatted)
      })
  }, [])

  return (
    <div style={{ height: "80vh" }}>
      <h1>Календарь</h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}
