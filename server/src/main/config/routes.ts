import { FastifyInstance } from 'fastify'
import poolRoutes from '@/main/routes/pools'
import userRoutes from '@/main/routes/guesses'
import guessRoutes from '@/main/routes/users'

export const setupRoutes = (app: FastifyInstance): void => {
  void app.register(poolRoutes)
  void app.register(userRoutes)
  void app.register(guessRoutes)
}
