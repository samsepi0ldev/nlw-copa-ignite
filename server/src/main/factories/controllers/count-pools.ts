import { Controller } from '@/application/controllers/controller'
import { CountPoolsController } from '@/application/controllers/count-pools-controller'
import { makeCountPoolsService } from '@/main/factories/use-cases/count-pools'

export const makeCountPoolsController = (): Controller => {
  return new CountPoolsController(makeCountPoolsService())
}
