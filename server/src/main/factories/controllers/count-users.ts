import { Controller } from '@/application/controllers/controller'
import { CountUsersController } from '@/application/controllers/count-users-controller'
import { makeCountUsersService } from '@/main/factories/use-cases/count-users'

export const makeCountUsersController = (): Controller => {
  return new CountUsersController(makeCountUsersService())
}
