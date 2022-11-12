import { app } from '@/main/config/app'
import cors from '@fastify/cors'

async function bootstrap (): Promise<void> {
  await app.register(cors, { origin: true })
  await app.listen({ port: 3333, host: '0.0.0.0' })
}

void bootstrap()
