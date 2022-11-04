import { describe, expect, it, vi } from 'vitest'

import { throwError } from '../../helper/throw'
import { DbCountGuessesService } from '@/data/use-cases/count-guesses'
import { CountGuessesRepository } from '@/data/protocols/count-guesses'

interface MakeSut {
  mockCountPoolRepository: CountPoolMockRepository
  sut: DbCountGuessesService
}

class CountPoolMockRepository implements CountGuessesRepository {
  value = { count: 10 }
  async count (): Promise<CountGuessesRepository.Output> {
    return this.value
  }
}

const makeSut = (): MakeSut => {
  const mockCountPoolRepository = new CountPoolMockRepository()
  const sut = new DbCountGuessesService(mockCountPoolRepository)
  return {
    mockCountPoolRepository,
    sut
  }
}

describe('DbCountGuesses', () => {
  it('Should return a object count', async () => {
    const { sut, mockCountPoolRepository } = makeSut()
    const res = await sut.execute()
    expect(res).toBe(mockCountPoolRepository.value)
  })
  it('Should throw if CountPoolRepository throws', async () => {
    const { sut, mockCountPoolRepository } = makeSut()
    vi.spyOn(mockCountPoolRepository, 'count').mockImplementationOnce(throwError)
    const res = sut.execute()
    await expect(res).rejects.toThrow()
  })
})
