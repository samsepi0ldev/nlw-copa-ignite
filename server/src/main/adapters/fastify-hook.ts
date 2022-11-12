import { FastifyRequest } from 'fastify'

export async function authenticateHook (request: FastifyRequest): Promise<void> {
  try {
    await request.jwtVerify()
  } catch (error) {}
}
