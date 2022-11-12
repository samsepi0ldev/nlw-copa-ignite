import Fastify from 'fastify'

import { setupRoutes } from '@/main/config/routes'
import { setupPlugins } from '@/main/config/plugins'

const app = Fastify({
  logger: true
})

setupPlugins(app)
setupRoutes(app)

export { app }
