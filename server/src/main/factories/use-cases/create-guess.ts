import { PrismaParticipantRepository } from '@/infra/participant-repository'
import { DbCreateGuess } from '@/data/use-cases/create-guess'
import { PrismaGuessesRepository } from '@/infra/guesses-repository'
import { PrismaGamesRepository } from '@/infra/games-repository'
import { CreateGuess } from '@/domain/use-cases/create-guess'

export const makeDbCreateGuess = (): CreateGuess => {
  const participantsRepo = new PrismaParticipantRepository()
  const guessesRepo = new PrismaGuessesRepository()
  const gameRepo = new PrismaGamesRepository()
  return new DbCreateGuess(
    participantsRepo,
    guessesRepo,
    gameRepo,
    guessesRepo
  )
}
