import { FastifyInstance } from 'fastify'
import jwt from '@fastify/jwt'

export function setupPlugins (fastify: FastifyInstance): void {
  void fastify.register(jwt, {
    secret: process.env.SUPERSECRET ?? 'dev_supersecret'
  })
}
