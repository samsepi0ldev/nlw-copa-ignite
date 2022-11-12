import { FastifyRequest } from 'fastify'

export async function authenticatePlugin (request: FastifyRequest): Promise<void> {
  await request.jwtVerify()
}
