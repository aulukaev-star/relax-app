"use client"

import { useState } from "react"

export default function AIPage() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")

  const send = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    })

    const data = await res.json()
    setResult(data.text)
  }

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">AI помощник</h1>

      <textarea
        className="border p-2 w-full"
        rows={4}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />

      <button
        onClick={send}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Спросить
      </button>

      <div className="border p-4 rounded whitespace-pre-wrap">
        {result}
      </div>

    </div>
  )
}
