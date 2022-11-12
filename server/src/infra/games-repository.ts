import { FindGameByIdRepository } from '@/data/protocols/find-game-by-id'
import { LoadGamesInPoolRepository } from '@/data/protocols/load-games-in-pool'
import { prisma } from '@/infra/prisma'

export class PrismaGamesRepository implements LoadGamesInPoolRepository, FindGameByIdRepository {
  async loadByPool ({ poolId, userId }: LoadGamesInPoolRepository.Input): Promise<LoadGamesInPoolRepository.Output> {
    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId,
              poolId
            }
          }
        }
      }
    })
    return this.map(games)
  }

  async findById ({ id }: FindGameByIdRepository.Input): Promise<FindGameByIdRepository.Output> {
    return await prisma.game.findUnique({
      where: { id }
    })
  }

  private map (games: any): any {
    return games.map((game: { guesses: string | any[] }) => ({
      ...game,
      guess: game.guesses.length > 0 ? game.guesses[0] : null,
      guesses: undefined
    }))
  }
}
