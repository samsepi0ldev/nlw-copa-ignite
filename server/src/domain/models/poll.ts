export type Poll = {
  id: string
  title: string
  code: string
  createdAt: Date
  ownerId?: string | null
  owner?: {
    id: string
    name: string
  } | null
  participants: Array<{
    id: string
    user: {
      avatar?: string | null
    } | null
  }>
  _count: {
    participants: number
  }
}
