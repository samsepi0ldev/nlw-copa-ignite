export class RequiredFieldError extends Error {
  constructor (field?: string) {
    const message = field !== undefined
      ? `This field ${field} is required`
      : 'Field required'
    super(message)
    this.name = 'RequiredFieldError'
  }
}
