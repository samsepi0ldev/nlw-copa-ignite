import { LoadPool } from '@/domain/use-cases/load-pool'

export interface LoadPoolRepository {
  load: (input: LoadPoolRepository.Input) => Promise<LoadPoolRepository.Output>
}

export namespace LoadPoolRepository {
  export type Input = LoadPool.Input
  export type Output = LoadPool.Output
}
