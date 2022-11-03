import { CountGuessesRepository } from '@/data/protocols/count-guesses'
import { prisma } from '@/infra/prisma'

export class PrismaGuessesRepository implements CountGuessesRepository {
  async count (): Promise<CountGuessesRepository.Output> {
    const count = await prisma.guess.count()
    return { count }
  }
}
