import { DbCreatePool } from '@/data/use-cases/create-pool'
import { CreatePool } from '@/domain/use-cases/create-pool'
import { UUIDAdapter } from '@/infra/cryptography/unique-id-adapter'
import { PrismaPoolsRepository } from '@/infra/pools-repository'

export const makeDbCreatePool = (): CreatePool => {
  const uuidGenerator = new UUIDAdapter()
  const repo = new PrismaPoolsRepository()
  return new DbCreatePool(uuidGenerator, repo)
}
