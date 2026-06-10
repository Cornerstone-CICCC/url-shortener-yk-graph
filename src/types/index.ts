export interface UrlDatabaseEntry {
  fullUrl: string
  clicks: number
}

export interface UrlDatabaseInterface {
  add(shortUrl: string, fullUrl: string): void
  find(shortUrl: string): UrlDatabaseEntry
  incrementClicks(shortUrl: string): void
  getAll(): Array<{ shortUrl: string; fullUrl: string; clicks: number }>
}
