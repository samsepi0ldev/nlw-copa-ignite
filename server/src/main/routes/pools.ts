import { FastifyPluginCallback } from 'fastify'

import { fastifyRouteAdapt as Adapt } from '@/main/adapters/fastify-routes'
import { makeCountPoolsController } from '@/main/factories/controllers/count-pools'
import { makeCreatePoolController } from '@/main/factories/controllers/create-pools'

const poolsRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/pools/count', Adapt(makeCountPoolsController()))
  fastify.post('/pools', Adapt(makeCreatePoolController()))
  done()
}

export default poolsRoutes
