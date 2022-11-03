import { CountUsersRepository } from '@/data/protocols/count-users'
import { prisma } from '@/infra/prisma'

export class PrismaUsersRepository implements CountUsersRepository {
  async count (): Promise<CountUsersRepository.Output> {
    const count = await prisma.user.count()
    return { count }
  }
}
