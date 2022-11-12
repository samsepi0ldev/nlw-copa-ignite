import { LoadPool } from '@/domain/use-cases/load-pool'
import { LoadPoolRepository } from '@/data/protocols/load-pool'

export class DbLoadPool implements LoadPool {
  constructor (private readonly loadPoolRepository: LoadPoolRepository) {}

  async execute (input: LoadPool.Input): Promise<any> {
    return await this.loadPoolRepository.load(input)
  }
}
