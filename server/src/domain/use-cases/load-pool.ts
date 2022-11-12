import { Poll } from '@/domain/models/poll'

export interface LoadPool {
  execute: (input: LoadPool.Input) => Promise<LoadPool.Output>
}

export namespace LoadPool {
  export type Input = { id: string }
  export type Output = Poll | null
}
