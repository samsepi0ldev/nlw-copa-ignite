import { UnauthorizedError } from '@/application/errors/unauthorized-error'
import { CreateUser } from '@/domain/use-cases/create-user'
import { CreateUserRepository } from '@/data/protocols/create-user'
import { LoadUserByGoogleIdRepository } from '@/data/protocols/load-user-by-google-id'
import { OAuthServiceGoogle } from '@/data/protocols/oauth'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly oauthServiceGoogle: OAuthServiceGoogle,
    private readonly loadUserByGoogleIdRepository: LoadUserByGoogleIdRepository,
    private readonly createUserRepository: CreateUserRepository
  ) {}

  async execute (input: CreateUser.Input): Promise<CreateUser.Output> {
    const userInfo = await this.oauthServiceGoogle.getUser(input)
    let user
    if (userInfo !== undefined) {
      user = await this.loadUserByGoogleIdRepository.loadByGoogleId({ googleId: userInfo.id })
      if (user === null) {
        user = await this.createUserRepository.create({
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture,
          googleId: userInfo.id
        })
      }
      return user
    }
    throw new UnauthorizedError()
  }
}
