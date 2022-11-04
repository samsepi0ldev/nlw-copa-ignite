import { Controller } from '@/application/controllers/controller'
import { CreatePoolController } from '@/application/controllers/create-pool-controller'
import { makeDbCreatePool } from '@/main/factories/use-cases/create-pool'

export const makeCreatePoolController = (): Controller => {
  return new CreatePoolController(makeDbCreatePool())
}
