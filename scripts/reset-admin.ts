import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = '89262493442@mail.ru'
  const password = 'admin123'

  const hash = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hash,
      role: 'ADMIN',
    },
    create: {
      email,
      password: hash,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin ready:', user.email)
}

main().finally(() => prisma.$disconnect())