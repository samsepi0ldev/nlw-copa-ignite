import { Controller } from '@/application/controllers/controller'
import { LoadPoolController } from '@/application/controllers/load-pool-controller'
import { makeDbLoadPool } from '@/main/factories/use-cases/load-pool'

export const makeLoadPoolController = (): Controller => {
  return new LoadPoolController(makeDbLoadPool())
}
