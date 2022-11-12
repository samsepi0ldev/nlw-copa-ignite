import { JoinPool } from '@/domain/use-cases/join-pool'
import { LoadPoolByCodeRepository } from '@/data/protocols/load-pool-by-code'
import { CreateParticipantRepository } from '@/data/protocols/create-participant'
import { UpdatePoolRepository } from '@/data/protocols/update-pool'
import { NotFoundError } from '@/application/errors/not-found-error'

export class DbJoinPool implements JoinPool {
  constructor (
    private readonly loadPoolByCodeRepository: LoadPoolByCodeRepository,
    private readonly updatePoolRepository: UpdatePoolRepository,
    private readonly createParticipantRepository: CreateParticipantRepository
  ) {}

  async execute ({ code, ownerId }: JoinPool.Input): Promise<boolean> {
    const pool = await this.loadPoolByCodeRepository.loadByCode({ code, userId: ownerId })
    if (pool !== null) {
      if (pool.participants.length <= 0) {
        if (pool.ownerId === null) {
          await this.updatePoolRepository.update({
            id: pool.id,
            ownerId
          })
        }
        return await this.createParticipantRepository.create({
          poolId: pool.id,
          userId: ownerId
        })
      }
      return false
    }
    throw new NotFoundError('Poll not found')
  }
}
