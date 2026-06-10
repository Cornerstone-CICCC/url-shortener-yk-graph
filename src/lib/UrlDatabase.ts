import { UrlDatabaseEntry, UrlDatabaseInterface } from '../types'

class UrlDatabase implements UrlDatabaseInterface {
  private static instance: UrlDatabase
  private store: Record<string, UrlDatabaseEntry>

  private constructor() {
    this.store = {}
  }

  static getInstance(): UrlDatabase {
    if (!UrlDatabase.instance) {
      UrlDatabase.instance = new UrlDatabase()
    }
    return UrlDatabase.instance
  }

  add(shortUrl: string, fullUrl: string): void {
    const alreadyExists = Object.values(this.store).some((entry) => entry.fullUrl === fullUrl)

    if (alreadyExists) {
      throw new Error('Full URL already exists')
    }

    this.store[shortUrl] = {
      fullUrl,
      clicks: 0,
    }
  }

  find(shortUrl: string): UrlDatabaseEntry {
    const target = this.store[shortUrl]

    if (!target) {
      throw new Error('Short URL not found')
    }

    return this.store[shortUrl]
  }

  incrementClicks(shortUrl: string): void {
    if (this.store[shortUrl]) {
      this.store[shortUrl].clicks++
    }
  }

  getAll(): Array<{ shortUrl: string; fullUrl: string; clicks: number }> {
    return Object.entries(this.store).map(([shortUrl, { fullUrl, clicks }]) => ({
      shortUrl,
      fullUrl,
      clicks,
    }))
  }
}

export default UrlDatabase
