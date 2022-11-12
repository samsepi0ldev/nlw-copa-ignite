import { UUIDGenerator } from '@/domain/cryptography/uuid-generator'
import { CreatePool } from '@/domain/use-cases/create-pool'
import { CreatePoolRepository } from '@/data/protocols/create-pool'

export class DbCreatePool implements CreatePool {
  constructor (
    private readonly uuidGenerator: UUIDGenerator,
    private readonly createPoolRepository: CreatePoolRepository
  ) {}

  async execute ({ title, ownerId }: CreatePool.Input): Promise<CreatePool.Output> {
    const code = this.uuidGenerator.generate().toUpperCase()
    await this.createPoolRepository.create({
      title,
      code,
      ownerId
    })
    return { code }
  }
}
