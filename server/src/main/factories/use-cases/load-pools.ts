import { DbLoadPools } from '@/data/use-cases/load-pools'
import { LoadPools } from '@/domain/use-cases/load-pools'
import { PrismaPoolsRepository } from '@/infra/pools-repository'

export const makeDbLoadPools = (): LoadPools => {
  const poolRepo = new PrismaPoolsRepository()
  return new DbLoadPools(poolRepo)
}
