export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export enum HttpStatusCode {
  Success = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  ServerError = 500
}
