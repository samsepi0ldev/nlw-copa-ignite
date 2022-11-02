import Fastify from 'fastify'

import { setupRoutes } from './routes'

const app = Fastify({
  logger: true
})

setupRoutes(app)

export { app }
