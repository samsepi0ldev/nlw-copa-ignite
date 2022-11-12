import { Game } from '@/domain/models/game'

export interface LoadGamesInPool {
  execute: (input: LoadGamesInPool.Input) => Promise<LoadGamesInPool.Output>
}

export namespace LoadGamesInPool {
  export type Input = {
    poolId: string
    userId: string
  }
  export type Output = Game[]
}
