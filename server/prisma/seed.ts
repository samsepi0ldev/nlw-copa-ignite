import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main (): Promise<void> {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://github.com/samsepi0ldev.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  const now = new Date()

  await prisma.game.create({
    data: {
      date: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() + 3).toISOString(),
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() + 5).toISOString(),
      firstTeamCountryCode: 'GB',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

void main()
