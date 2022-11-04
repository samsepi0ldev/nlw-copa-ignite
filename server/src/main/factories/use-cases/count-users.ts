import { DbCountUsersService } from '@/data/use-cases/count-users'
import { CountUsersService } from '@/domain/use-cases/count-users'
import { PrismaUsersRepository } from '@/infra/users-repository'

export const makeCountUsersService = (): CountUsersService => {
  const repo = new PrismaUsersRepository()
  return new DbCountUsersService(repo)
}
