import { FastifyPluginCallback } from 'fastify'

import { fastifyRouteAdapt as Adapt } from '@/main/adapters/fastify-routes'
import { makeCountGuessesController } from '@/main/factories/controllers/count-guesses'

const guessesRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/guesses/count', Adapt(makeCountGuessesController()))
  done()
}

export default guessesRoutes
