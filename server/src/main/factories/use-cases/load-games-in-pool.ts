import { DbLoadGamesInPool } from '@/data/use-cases/load-games-in-pool'
import { LoadGamesInPool } from '@/domain/use-cases/load-games-in-pool'
import { PrismaGamesRepository } from '@/infra/games-repository'

export const makeDbLoadGamesInPool = (): LoadGamesInPool => {
  const gamesRepo = new PrismaGamesRepository()
  return new DbLoadGamesInPool(gamesRepo)
}
