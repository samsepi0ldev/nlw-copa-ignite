import { LoadPools } from '@/domain/use-cases/load-pools'
import { LoadPoolsRepository } from '@/data/protocols/load-pools-repository'

export class DbLoadPools implements LoadPools {
  constructor (private readonly loadPoolsRepository: LoadPoolsRepository) {}

  async execute (input: LoadPools.Input): Promise<any> {
    return await this.loadPoolsRepository.loadAll(input)
  }
}
