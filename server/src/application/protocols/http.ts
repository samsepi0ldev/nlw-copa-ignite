export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export enum HttpStatusCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  ServerError = 500
}
