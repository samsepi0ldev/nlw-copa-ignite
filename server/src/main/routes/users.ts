import { FastifyPluginCallback } from 'fastify'

import { fastifyRouteAdapt as Adapt } from '@/main/adapters/fastify-routes'
import { makeCountUsersController } from '@/main/factories/controllers/count-users'

const usersRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/users/count', Adapt(makeCountUsersController()))
  done()
}

export default usersRoutes
