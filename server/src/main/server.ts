import { app } from '@/main/config/app'

async function bootstrap (): Promise<void> {
  await app.listen({ port: 3333 })
}

void bootstrap()
