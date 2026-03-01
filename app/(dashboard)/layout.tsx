import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          background: "#111",
          color: "white",
          padding: 20,
        }}
      >
        <h2>CRM</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>

          <Link href="/clients" style={{ color: "white" }}>
            Клиенты
          </Link>

          <Link href="/events" style={{ color: "white" }}>
            События
          </Link>

          <Link href="/venues" style={{ color: "white" }}>
            Площадки
          </Link>

          <Link href="/calendar" style={{ color: "white" }}>
            Календарь
          </Link>

          <Link href="/employees" style={{ color: "white" }}>
            Сотрудники
          </Link>

	  <Link href="/assign" style={{ color: "white" }}>
            Назначения

          </Link>
          <Link href="/finance" style={{ color: "white" }}>
            Финансы
          </Link>

          <Link href="/logout" style={{ color: "red" }}>
            Выход
          </Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 40 }}>
        {children}
      </main>
    </div>
  )
}
