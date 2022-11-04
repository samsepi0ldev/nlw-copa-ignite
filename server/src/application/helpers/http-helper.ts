import { HttpResponse, HttpStatusCode } from '@/application/protocols/http'
import { ServerError } from '@/application/errors/server-error'

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.Success,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.Created,
  body: data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.BadRequest,
  body: error
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.ServerError,
  body: new ServerError(error instanceof Error ? error : undefined)
})
