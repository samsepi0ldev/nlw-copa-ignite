export interface LoadPoolByCodeRepository {
  loadByCode: (input: LoadPoolByCodeRepository.Input) => Promise<LoadPoolByCodeRepository.Output>
}

export namespace LoadPoolByCodeRepository {
  export type Input = {
    code: string
    userId: string
  }
  export type Output = {
    id: string
    title: string
    code: string
    createdAt: Date
    ownerId?: string | null
    participants: Array<{
      id: string
      userId: string
      poolId: string
    }>
  } | null
}
