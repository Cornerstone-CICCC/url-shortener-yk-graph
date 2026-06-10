"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UrlDatabase {
    constructor() {
        this.store = {};
    }
    static getInstance() {
        if (!UrlDatabase.instance) {
            UrlDatabase.instance = new UrlDatabase();
        }
        return UrlDatabase.instance;
    }
    add(shortUrl, fullUrl) {
        const alreadyExists = Object.values(this.store).some((entry) => entry.fullUrl === fullUrl);
        if (alreadyExists) {
            throw new Error('Full URL already exists');
        }
        this.store[shortUrl] = {
            fullUrl,
            clicks: 0,
        };
    }
    find(shortUrl) {
        const target = this.store[shortUrl];
        if (!target) {
            throw new Error('Short URL not found');
        }
        return this.store[shortUrl];
    }
    incrementClicks(shortUrl) {
        if (this.store[shortUrl]) {
            this.store[shortUrl].clicks++;
        }
    }
    getAll() {
        return this.store;
    }
}
exports.default = UrlDatabase;
