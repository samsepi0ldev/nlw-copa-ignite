import { describe, expect, it, vi } from 'vitest'
import { CountGuessesController } from '@/application/controllers/count-guesses-controller'
import { CountGuessesService } from '@/domain/use-cases/count-guesses'
import { ok, serverError } from '@/application/helpers/http-helper'
import { throwError } from '../../helper/throw'

interface MakeSut {
  mockCountGuesses: CountGuessesServiceMock
  sut: CountGuessesController
}

class CountGuessesServiceMock implements CountGuessesService {
  async execute (): Promise<CountGuessesService.Output> {
    return { count: 1 }
  }
}

const makeSut = (): MakeSut => {
  const mockCountGuesses = new CountGuessesServiceMock()
  const sut = new CountGuessesController(mockCountGuesses)
  return {
    mockCountGuesses,
    sut
  }
}

describe('Count Guesses controller', () => {
  it('should return a count pool', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({})
    expect(res).toEqual(ok({ count: 1 }))
  })
  it('should return server error', async () => {
    const { sut, mockCountGuesses } = makeSut()
    vi.spyOn(mockCountGuesses, 'execute').mockImplementation((throwError))
    const res = await sut.handle({})
    expect(res).toEqual(serverError(new Error()))
  })
})
