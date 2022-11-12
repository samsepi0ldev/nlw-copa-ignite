import { Controller } from '@/application/controllers/controller'
import { JoinPoolController } from '@/application/controllers/join-pool-controller'
import { makeDbJoinPool } from '@/main/factories/use-cases/join-pool'

export const makeJoinPoolController = (): Controller => {
  return new JoinPoolController(makeDbJoinPool())
}
