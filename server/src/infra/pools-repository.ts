import { LoadPoolsRepository } from '@/data/protocols/load-pools-repository'
import { LoadPoolRepository } from '@/data/protocols/load-pool'
import { CountPoolsRepository } from '@/data/protocols/count-pools'
import { CreatePoolRepository } from '@/data/protocols/create-pool'
import { LoadPoolByCodeRepository } from '@/data/protocols/load-pool-by-code'
import { UpdatePoolRepository } from '@/data/protocols/update-pool'
import { prisma } from '@/infra/prisma'

export class PrismaPoolsRepository implements CountPoolsRepository, CreatePoolRepository, LoadPoolByCodeRepository, UpdatePoolRepository, LoadPoolsRepository, LoadPoolRepository {
  async count (): Promise<CountPoolsRepository.Output> {
    const count = await prisma.pool.count()
    return { count }
  }

  async create ({ ownerId, ...rest }: CreatePoolRepository.Input): Promise<void> {
    if (ownerId !== undefined) {
      await prisma.pool.create({
        data: {
          ...rest,
          ownerId,
          participants: {
            create: {
              userId: ownerId
            }
          }
        }
      })
    } else {
      await prisma.pool.create({ data: rest })
    }
  }

  async loadByCode ({ code, userId }: LoadPoolByCodeRepository.Input): Promise<LoadPoolByCodeRepository.Output> {
    return await prisma.pool.findUnique({
      where: { code },
      include: {
        participants: {
          where: {
            userId
          }
        }
      }
    })
  }

  async update ({ id, ...data }: UpdatePoolRepository.Input): Promise<void> {
    await prisma.pool.update({
      where: { id },
      data
    })
  }

  async loadAll ({ userId }: LoadPoolsRepository.Input): Promise<LoadPoolsRepository.Output> {
    return await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId
          }
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatar: true
              }
            }
          },
          take: 4
        },
        _count: {
          select: {
            participants: true
          }
        }
      }
    })
  }

  async load ({ id }: LoadPoolRepository.Input): Promise<LoadPoolRepository.Output> {
    return await prisma.pool.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatar: true
              }
            }
          },
          take: 4
        },
        _count: {
          select: {
            participants: true
          }
        }
      }
    })
  }
}
