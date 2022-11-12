import { LoadPools } from '@/domain/use-cases/load-pools'

export interface LoadPoolsRepository {
  loadAll: (input: LoadPoolsRepository.Input) => Promise<LoadPoolsRepository.Output>
}

export namespace LoadPoolsRepository {
  export type Input = LoadPools.Input
  export type Output = LoadPools.Output
}
