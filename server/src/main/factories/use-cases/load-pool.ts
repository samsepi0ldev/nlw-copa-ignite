import { DbLoadPool } from '@/data/use-cases/load-pool'
import { LoadPool } from '@/domain/use-cases/load-pool'
import { PrismaPoolsRepository } from '@/infra/pools-repository'

export const makeDbLoadPool = (): LoadPool => {
  const poolRepo = new PrismaPoolsRepository()
  return new DbLoadPool(poolRepo)
}
