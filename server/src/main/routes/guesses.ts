import { FastifyPluginCallback } from 'fastify'

import { fastifyRouteAdapt as Adapt } from '@/main/adapters/fastify-routes'
import { makeCountGuessesController } from '@/main/factories/controllers/count-guesses'
import { makeCreateGuessController } from '@/main/factories/controllers/create-guess'
import { authenticatePlugin } from '@/main/adapters/fastify-authenticate'

const guessesRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/guesses/count', Adapt(makeCountGuessesController()))
  fastify.post('/pools/:poolId/games/:gameId/guesses', { onRequest: [authenticatePlugin] }, Adapt(makeCreateGuessController()))
  done()
}

export default guessesRoutes
