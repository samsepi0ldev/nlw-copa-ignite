import { CreateGuess } from '@/domain/use-cases/create-guess'
import { CreateGuessRepository } from '@/data/protocols/create-guess'
import { FindGameByIdRepository } from '@/data/protocols/find-game-by-id'
import { FindGuessByParticipantAndGameRepository } from '@/data/protocols/find-guess-by-participant-and-game.ts'
import { FindParticipantByPoolAndUserRepository } from '@/data/protocols/find-participant-by-pool-and-user'
import { ForbiddenError } from '@/application/errors/forbidden-error'
import { NotFoundError } from '@/application/errors/not-found-error'

export class DbCreateGuess implements CreateGuess {
  constructor (
    private readonly findParticipantByPoolAndUserRepository: FindParticipantByPoolAndUserRepository,
    private readonly findGuessByParticipantAndGameRepository: FindGuessByParticipantAndGameRepository,
    private readonly findGameByIdRepository: FindGameByIdRepository,
    private readonly createGuessRepository: CreateGuessRepository
  ) {}

  async execute ({
    poolId,
    userId,
    gameId,
    firstTeamPoints,
    secondTeamPoints
  }: CreateGuess.Input): Promise<Error | undefined> {
    const participant = await this.findParticipantByPoolAndUserRepository.findByPoolAndUser({
      poolId,
      userId
    })
    if (participant !== null) {
      const guess = await this.findGuessByParticipantAndGameRepository.findByParticipantAndGame({
        gameId,
        participantId: participant.id
      })
      if (guess !== null) {
        return new ForbiddenError('You already sent a guess to this game on this poll.')
      }
      const game = await this.findGameByIdRepository.findById({ id: gameId })
      if (game !== null) {
        if (game.date < new Date()) {
          return new ForbiddenError('You cannot send a guess after the game')
        }
        await this.createGuessRepository.create({
          firstTeamPoints,
          secondTeamPoints,
          participantId: participant.id,
          gameId
        })
        return
      }
      throw new NotFoundError('Game not found.')
    }
    return new ForbiddenError("You're not allowed to create a guess inside this poll.")
  }
}
