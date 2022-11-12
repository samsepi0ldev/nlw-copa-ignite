export interface JoinPool {
  execute: (input: JoinPool.Input) => Promise<boolean>
}

export namespace JoinPool {
  export type Input = {
    code: string
    ownerId: string
  }
}
