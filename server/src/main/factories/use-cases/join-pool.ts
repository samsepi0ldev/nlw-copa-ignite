import { DbJoinPool } from '@/data/use-cases/join-pool'
import { JoinPool } from '@/domain/use-cases/join-pool'
import { PrismaParticipantRepository } from '@/infra/participant-repository'
import { PrismaPoolsRepository } from '@/infra/pools-repository'

export const makeDbJoinPool = (): JoinPool => {
  const poolRepo = new PrismaPoolsRepository()
  const participantRepo = new PrismaParticipantRepository()
  return new DbJoinPool(poolRepo, poolRepo, participantRepo)
}
