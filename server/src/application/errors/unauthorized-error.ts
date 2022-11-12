export class UnauthorizedError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'UnauthorizedError'
  }
}
