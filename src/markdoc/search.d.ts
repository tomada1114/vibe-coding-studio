declare module "@/markdoc/search.mjs" {
  export interface Result {
    url: string
    title: string
    pageTitle?: string
    [key: string]: unknown
  }
  export function search(query: string, options?: { limit?: number }): Result[]
}
