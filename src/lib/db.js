import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const prismaClientSingleton = () => {
    const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL

    if (!connectionString) {
        throw new Error("DATABASE_URL is not set. Check your .env file or Vercel environment variables.")
    }

    const pool = new pg.Pool({
        connectionString,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    })

    pool.on('error', (err) => {
        console.error('PostgreSQL pool error:', err.message)
    })

    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
