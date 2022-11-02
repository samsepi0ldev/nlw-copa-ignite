import { FastifyPluginCallback } from 'fastify'

import { fastifyRouteAdapt as Adapt } from '@/main/adapters/fastify-routes'
import { makeCountPoolsController } from '@/main/factories/controllers/count-pools'

const poolsRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/pools/count', Adapt(makeCountPoolsController()))
  done()
}

export default poolsRoutes
