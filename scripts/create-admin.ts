import "dotenv/config"
import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma"

async function main() {
  const hash = await bcrypt.hash("admin123", 10)

  const user = await prisma.user.upsert({
    where: { email: "89262493442@mail.ru" },
    update: { password: hash, role: "ADMIN" },
    create: {
      email: "89262493442@mail.ru",
      password: hash,
      role: "ADMIN",
    },
  })

  console.log("? Admin ready:", user.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())