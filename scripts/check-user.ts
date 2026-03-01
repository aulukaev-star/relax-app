import "dotenv/config"
import { prisma } from "../lib/prisma"

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "89262493442@mail.ru" },
  })

  console.log(user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())