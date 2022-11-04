import Fastify from 'fastify'

import { setupRoutes } from '@/main/config/routes'

const app = Fastify({
  logger: true
})

setupRoutes(app)

export { app }
