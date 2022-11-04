import { Validator } from '../protocols/validator'
import { Required, RequiredString } from './required'

type ValidationProps = {
  value: any
  field?: string
}

export class ValidationBuilder {
  constructor (
    private readonly value: any,
    private readonly field?: string,
    private readonly validators: Validator[] = []
  ) {

  }

  static of ({ value, field }: ValidationProps): ValidationBuilder {
    return new ValidationBuilder(value, field)
  }

  required (): ValidationBuilder {
    if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.field))
    } else {
      this.validators.push(new Required(this.value, this.field))
    }
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
