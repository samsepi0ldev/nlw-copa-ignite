import { FastifyPluginCallback } from 'fastify'

import { fastifyRouteAdapt as Adapt } from '@/main/adapters/fastify-routes'
import { makeLoadGamesInPoolController } from '@/main/factories/controllers/load-games-in-pool'
import { authenticatePlugin } from '@/main/adapters/fastify-authenticate'

const gamesRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/pools/:id/games', { onRequest: [authenticatePlugin] }, Adapt(makeLoadGamesInPoolController()))
  done()
}

export default gamesRoutes
