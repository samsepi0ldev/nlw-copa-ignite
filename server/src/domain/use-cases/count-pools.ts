export interface CountPoolsService {
  execute: () => Promise<CountPoolsService.Output>
}

export namespace CountPoolsService {
  export type Output = { count: number }
}
