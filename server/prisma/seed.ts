import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'email1@email.com',
      avatarUrl: null
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example pool',
      code: 'BOL123',
      ownerId: user.id,
      
      participants: {
        create: {
          userId: user.id
        }
      }

    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.201Z',
      fistTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.201Z',
      fistTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          fistTeamPoints: 2,
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

main()