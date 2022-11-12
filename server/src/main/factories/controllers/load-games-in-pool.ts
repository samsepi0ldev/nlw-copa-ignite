import { Controller } from '@/application/controllers/controller'
import { LoadGamesInPoolController } from '@/application/controllers/load-games-in-pool-controller'
import { makeDbLoadGamesInPool } from '@/main/factories/use-cases/load-games-in-pool'

export const makeLoadGamesInPoolController = (): Controller => {
  return new LoadGamesInPoolController(makeDbLoadGamesInPool())
}
