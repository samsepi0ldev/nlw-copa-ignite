import { Validator } from '@/application/protocols/validator'
import { RequiredFieldError } from '@/application/errors/validation'

export class Required implements Validator {
  constructor (
    readonly value: any,
    readonly field?: string
  ) {}

  validate (): Error | undefined {
    console.log(this, 'error')
    if (this.value === undefined || this.value === null) {
      return new RequiredFieldError(this.field)
    }
  }
}

export class RequiredString extends Required {
  constructor (
    override readonly value: string,
    override readonly field?: string
  ) {
    super(value, field)
  }

  override validate (): Error | undefined {
    if (super.validate() !== undefined || this.value === '') {
      return new RequiredFieldError(this.field)
    }
  }
}
