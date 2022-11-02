import { CountPoolsRepository } from '@/data/protocols/count-pools'
import { prisma } from '@/infra/prisma'

export class PrismaPoolsRepository implements CountPoolsRepository {
  async count (): Promise<CountPoolsRepository.Output> {
    const count = await prisma.pool.count()
    return { count }
  }
}
