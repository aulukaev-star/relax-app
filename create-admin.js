const { PrismaClient } = require('@prisma/client')
const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')
const bcrypt = require('bcrypt')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  const hashedPassword = await bcrypt.hash('1234567890', 10)

  await prisma.user.upsert({
    where: { email: '89262493442@mail.ru' },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email: '89262493442@mail.ru',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created or updated')
  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
