import { FastifyPluginCallback } from 'fastify'

import { fastifyRouteAdapt as Adapt } from '@/main/adapters/fastify-routes'
import { makeCountPoolsController } from '@/main/factories/controllers/count-pools'
import { makeCreatePoolController } from '@/main/factories/controllers/create-pools'
import { authenticateHook } from '@/main/adapters/fastify-hook'
import { authenticatePlugin } from '@/main/adapters/fastify-authenticate'
import { makeJoinPoolController } from '@/main/factories/controllers/join-pool'
import { makeLoadPoolsController } from '@/main/factories/controllers/load-pools'
import { makeLoadPoolController } from '@/main/factories/controllers/load-pool'

const poolsRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/pools/count', Adapt(makeCountPoolsController()))
  fastify.post('/pools', { onRequest: [authenticateHook] }, Adapt(makeCreatePoolController()))
  fastify.post('/pools/join', { onRequest: [authenticatePlugin] }, Adapt(makeJoinPoolController()))
  fastify.get('/pools', { onRequest: [authenticatePlugin] }, Adapt(makeLoadPoolsController()))
  fastify.get('/pools/:id', { onRequest: [authenticatePlugin] }, Adapt(makeLoadPoolController()))
  done()
}

export default poolsRoutes
