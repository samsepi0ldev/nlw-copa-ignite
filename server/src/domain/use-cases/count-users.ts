export interface CountUsersService {
  execute: () => Promise<CountUsersService.Output>
}

export namespace CountUsersService {
  export type Output = { count: number }
}
