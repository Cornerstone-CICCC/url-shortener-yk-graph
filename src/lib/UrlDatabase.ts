type UrlDatabaseEntry = {
  fullUrl: string
  clicks: number
}

class UrlDatabase {
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

  incrementClicks(shortUrl: string) {
    if (this.store[shortUrl]) {
      this.store[shortUrl].clicks++
    }
  }

  getAll(): Record<string, UrlDatabaseEntry> {
    return this.store
  }
}

export default UrlDatabase
