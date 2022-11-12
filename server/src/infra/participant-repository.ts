import { CreateParticipantRepository } from '@/data/protocols/create-participant'
import { FindParticipantByPoolAndUserRepository } from '@/data/protocols/find-participant-by-pool-and-user'
import { prisma } from '@/infra/prisma'

export class PrismaParticipantRepository implements CreateParticipantRepository, FindParticipantByPoolAndUserRepository {
  async create ({ poolId, userId }: CreateParticipantRepository.Input): Promise<boolean> {
    const participant = await prisma.participant.create({
      data: {
        poolId,
        userId
      }
    })
    return participant !== null
  }

  async findByPoolAndUser ({ poolId, userId }: FindParticipantByPoolAndUserRepository.Input): Promise<FindParticipantByPoolAndUserRepository.Output> {
    return await prisma.participant.findUnique({
      where: {
        userId_poolId: {
          poolId,
          userId
        }
      }
    })
  }
}
