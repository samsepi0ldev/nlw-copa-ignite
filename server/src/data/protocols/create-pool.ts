export interface CreatePoolRepository {
  create: (input: CreatePoolRepository.Input) => Promise<void>
}

export namespace CreatePoolRepository {
  export type Input = {
    title: string
    code: string
    ownerId?: string
  }
}
