import { CountUsersService } from '@/domain/use-cases/count-users'
import { CountUsersRepository } from '@/data/protocols/count-users'

export class DbCountUsersService implements CountUsersService {
  constructor (private readonly countUsersRepository: CountUsersRepository) {}

  async execute (): Promise<CountUsersService.Output> {
    return await this.countUsersRepository.count()
  }
}
