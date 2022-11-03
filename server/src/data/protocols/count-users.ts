import { CountUsersService } from '@/domain/use-cases/count-users'

export interface CountUsersRepository {
  count: () => Promise<CountUsersRepository.Output>
}

export namespace CountUsersRepository {
  export type Output = CountUsersService.Output
}
