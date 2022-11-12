import { LoadGamesInPool } from '@/domain/use-cases/load-games-in-pool'

export interface LoadGamesInPoolRepository {
  loadByPool: (input: LoadGamesInPoolRepository.Input) => Promise<LoadGamesInPoolRepository.Output>
}

export namespace LoadGamesInPoolRepository {
  export type Input = LoadGamesInPool.Input
  export type Output = LoadGamesInPool.Output
}
