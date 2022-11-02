import { DbCountPoolsService } from '@/data/use-cases/count-pools'
import { CountPoolsService } from '@/domain/use-cases/count-pools'
import { PrismaPoolsRepository } from '@/infra/pools-repository'

export const makeCountPoolsService = (): CountPoolsService => {
  const repo = new PrismaPoolsRepository()
  return new DbCountPoolsService(repo)
}
