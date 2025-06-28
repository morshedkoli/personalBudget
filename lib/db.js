import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Hardcoded configuration - replace with your actual values
const DATABASE_URL = "mongodb+srv://personalbudget:f9nIBefN95l7OFWV@cluster0.dmtd1.mongodb.net/personalbudget?retryWrites=true&w=majority&appName=Cluster0"
const NODE_ENV = "production"

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: NODE_ENV === 'development' ? ['query'] : ['error'],
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  })

if (NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
