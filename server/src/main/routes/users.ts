import { FastifyPluginCallback } from 'fastify'

import { fastifyRouteAdapt as Adapt } from '@/main/adapters/fastify-routes'
import { makeCountUsersController } from '@/main/factories/controllers/count-users'
import { makeLoginOrCreateUserController } from '@/main/factories/controllers/create-user'
import { authenticatePlugin } from '@/main/adapters/fastify-authenticate'

const usersRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/users/count', Adapt(makeCountUsersController()))
  fastify.post('/users', Adapt(makeLoginOrCreateUserController()))
  fastify.get('/me', { onRequest: [authenticatePlugin] }, async (request) => {
    return { user: request.user }
  })
  done()
}

export default usersRoutes
