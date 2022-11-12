import { Controller } from '@/application/controllers/controller'
import { LoadPoolsController } from '@/application/controllers/load-pools-controller'
import { makeDbLoadPools } from '@/main/factories/use-cases/load-pools'

export const makeLoadPoolsController = (): Controller => {
  return new LoadPoolsController(makeDbLoadPools())
}
