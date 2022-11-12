import { DbCreateUser } from '@/data/use-cases/create-user'
import { CreateUser } from '@/domain/use-cases/create-user'
import { OAuthServiceGetUserInfo } from '@/infra/services/oauth-adapter'
import { PrismaUsersRepository } from '@/infra/users-repository'

export const makeDbCreateUser = (): CreateUser => {
  const oauthService = new OAuthServiceGetUserInfo()
  const repo = new PrismaUsersRepository()
  return new DbCreateUser(oauthService, repo, repo)
}
