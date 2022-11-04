import ShortUniqueId from 'short-unique-id'

import { UUIDGenerator } from '@/domain/cryptography/uuid-generator'

export class UUIDAdapter implements UUIDGenerator {
  generate (): string {
    const uniqueId = new ShortUniqueId({ length: 6 })
    return uniqueId().toString()
  }
}
