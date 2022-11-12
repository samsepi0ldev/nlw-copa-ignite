export interface CreatePool {
  execute: (input: CreatePool.Input) => Promise<CreatePool.Output>
}

export namespace CreatePool {
  export type Input = {
    title: string
    ownerId?: string
  }
  export type Output = { code: string }
}
