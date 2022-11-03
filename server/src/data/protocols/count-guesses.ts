import { CountPoolsService } from '@/domain/use-cases/count-pools'

export interface CountPoolsRepository {
  count: () => Promise<CountPoolsRepository.Output>
}

export namespace CountPoolsRepository {
  export type Output = CountPoolsService.Output
}
