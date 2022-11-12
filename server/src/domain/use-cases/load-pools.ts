import { Poll } from '@/domain/models/poll'

export interface LoadPools {
  execute: (input: LoadPools.Input) => Promise<LoadPools.Output>
}

export namespace LoadPools {
  export type Input = { userId: string }
  export type Output = Poll[]
}
