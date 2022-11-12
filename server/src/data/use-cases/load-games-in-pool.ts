import { LoadGamesInPool } from '@/domain/use-cases/load-games-in-pool'
import { LoadGamesInPoolRepository } from '@/data/protocols/load-games-in-pool'

export class DbLoadGamesInPool implements LoadGamesInPool {
  constructor (private readonly loadGamesInPoolRepository: LoadGamesInPoolRepository) {}

  async execute (input: LoadGamesInPool.Input): Promise<LoadGamesInPool.Output> {
    return await this.loadGamesInPoolRepository.loadByPool(input)
  }
}
