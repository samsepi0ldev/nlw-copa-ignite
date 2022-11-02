import { FastifyInstance } from 'fastify'
import poolRoutes from '../routes/pools'

export const setupRoutes = (app: FastifyInstance): void => {
  void app.register(poolRoutes)
}
