import { Controller } from '@/application/controllers/controller'
import { LoginOrCreateUserController } from '@/application/controllers/login-or-create-user-controller'
import { makeDbCreateUser } from '@/main/factories/use-cases/create-user'
import { makeAuthentication } from '@/main/factories/use-cases/authentication'

export const makeLoginOrCreateUserController = (): Controller => {
  return new LoginOrCreateUserController(makeDbCreateUser(), makeAuthentication())
}
