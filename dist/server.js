"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const shortid_1 = require("shortid");
const UrlDatabase_1 = __importDefault(require("./lib/UrlDatabase"));
const app = (0, express_1.default)();
const urlDatabase = UrlDatabase_1.default.getInstance();
app.set('view engine', 'ejs');
app.use((0, express_2.urlencoded)({ extended: true }));
app.get('/', (req, res) => {
    // Render the list of shortened URLs and their stats here
    const shortUrls = urlDatabase.getAll();
    res.render('index', { shortUrls }); // Placeholder, students will populate
});
app.post('/shortUrls', (req, res) => {
    // Capture the full URL from form input
    const { fullUrl } = req.body;
    // Generate a unique short URL and store in urlDatabase
    const shortUrl = (0, shortid_1.generate)();
    try {
        urlDatabase.add(shortUrl, fullUrl);
        // Redirect back to home page
        res.status(302).redirect('/');
    }
    catch (error) {
        if (error instanceof Error) {
            res.render('index', {
                shortUrls: urlDatabase.getAll(),
                error: error.message,
            });
        }
    }
});
app.get('/:shortUrl', (req, res) => {
    // Check if short URL exists in urlDatabase
    const { shortUrl } = req.params;
    try {
        const existsUrl = urlDatabase.find(shortUrl);
        // Increment click count if found and redirect to full URL
        urlDatabase.incrementClicks(shortUrl);
        res.redirect(existsUrl.fullUrl);
    }
    catch (error) {
        if (error instanceof Error) {
            // Send 404 status if short URL not found
            res.status(404).send(error.message);
        }
    }
});
app.listen(3200, () => console.log('Server started!!!!'));
