import { CountPoolsRepository } from '@/data/protocols/count-pools'
import { CreatePoolRepository } from '@/data/protocols/create-pool'
import { prisma } from '@/infra/prisma'

export class PrismaPoolsRepository implements CountPoolsRepository, CreatePoolRepository {
  async count (): Promise<CountPoolsRepository.Output> {
    const count = await prisma.pool.count()
    return { count }
  }

  async create (data: CreatePoolRepository.Input): Promise<void> {
    await prisma.pool.create({ data })
  }
}
