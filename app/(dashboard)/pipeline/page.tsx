"use client"

import { useEffect, useState } from "react"

const stages = ["lead", "meeting", "proposal", "booked", "done"]

export default function PipelinePage() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/pipeline")
      .then(res => res.json())
      .then(setEvents)
  }, [])

  return (
    <div className="p-6 grid grid-cols-5 gap-4">

      {stages.map(stage => (
        <div key={stage} className="bg-gray-100 p-3 rounded">

          <div className="font-semibold mb-2">{stage}</div>

          {events
            .filter(e => e.stage === stage)
            .map(e => (
              <div key={e.id} className="bg-white p-2 rounded mb-2 shadow">
                <div>{e.title}</div>
                <div className="text-sm text-gray-500">
                  {e.client?.name}
                </div>
              </div>
            ))}
        </div>
      ))}

    </div>
  )
}
