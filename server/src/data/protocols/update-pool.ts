export interface UpdatePoolRepository {
  update: (input: UpdatePoolRepository.Input) => Promise<void>
}

export namespace UpdatePoolRepository {
  export type Input = {
    id: string
    title?: string
    code?: string
    ownerId?: string
  }
}
