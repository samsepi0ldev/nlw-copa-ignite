import { CountGuessesRepository } from '@/data/protocols/count-guesses'
import { CreateGuessRepository } from '@/data/protocols/create-guess'
import { FindGuessByParticipantAndGameRepository } from '@/data/protocols/find-guess-by-participant-and-game.ts'
import { prisma } from '@/infra/prisma'

export class PrismaGuessesRepository implements CountGuessesRepository, FindGuessByParticipantAndGameRepository, CreateGuessRepository {
  async count (): Promise<CountGuessesRepository.Output> {
    const count = await prisma.guess.count()
    return { count }
  }

  async findByParticipantAndGame ({ gameId, participantId }: FindGuessByParticipantAndGameRepository.Input): Promise<FindGuessByParticipantAndGameRepository.Output> {
    return await prisma.guess.findUnique({
      where: {
        gameId_participantId: {
          gameId,
          participantId
        }
      }
    })
  }

  async create (input: CreateGuessRepository.Input): Promise<void> {
    await prisma.guess.create({
      data: {
        firstTeamPoints: input.firstTeamPoints,
        secondTeamPoints: input.secondTeamPoints,
        gameId: input.gameId,
        participantId: input.participantId
      }
    })
  }
}
