import { CountUsersRepository } from '@/data/protocols/count-users'
import { CreateUserRepository } from '@/data/protocols/create-user'
import { LoadUserByGoogleIdRepository } from '@/data/protocols/load-user-by-google-id'
import { prisma } from '@/infra/prisma'

export class PrismaUsersRepository implements CountUsersRepository, LoadUserByGoogleIdRepository, CreateUserRepository {
  async count (): Promise<CountUsersRepository.Output> {
    const count = await prisma.user.count()
    return { count }
  }

  async loadByGoogleId ({ googleId }: LoadUserByGoogleIdRepository.Input): Promise<LoadUserByGoogleIdRepository.Output> {
    return await prisma.user.findUnique({
      where: { googleId }
    })
  }

  async create (data: CreateUserRepository.Input): Promise<CreateUserRepository.Output> {
    const user = await prisma.user.create({ data })
    return user
  }
}
