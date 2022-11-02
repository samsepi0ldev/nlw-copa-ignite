import { RouteHandler } from 'fastify'

import { Controller } from '@/application/controllers/controller'

type Adapt = (controller: Controller) => RouteHandler

export const fastifyRouteAdapt: Adapt = controller => async (request, reply) => {
  const { statusCode, body } = await controller.handle({
    ...request.body as object
  })
  const json = [200, 201, 204].includes(statusCode) ? body : { error: body.message }
  return await reply.status(statusCode).send(json)
}
