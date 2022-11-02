import { CountPoolsService } from '@/domain/use-cases/count-pools'
import { CountPoolsRepository } from '@/data/protocols/count-pools'

export class DbCountPoolsService implements CountPoolsService {
  constructor (private readonly countPoolsRepository: CountPoolsRepository) {}

  async execute (): Promise<CountPoolsService.Output> {
    return await this.countPoolsRepository.count()
  }
}
