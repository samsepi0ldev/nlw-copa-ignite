import ShortUniqueId from 'short-unique-id'

import { UniqueIdGenerator } from '@/domain/cryptography/unique-id-generator'

export class UniqueIdAdapter implements UniqueIdGenerator {
  generate (): string {
    const uniqueId = new ShortUniqueId({ length: 6 })
    return uniqueId()
  }
}
