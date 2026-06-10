import express, { Request, Response } from 'express'
import { urlencoded } from 'express'
import { generate } from 'shortid'

import UrlDatabase from './lib/UrlDatabase'

const app = express()
const urlDatabase = UrlDatabase.getInstance()

app.set('view engine', 'ejs')
app.use(urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  // Render the list of shortened URLs and their stats here
  // const shortUrls = Object.entries(urlDatabase).map(([short, { full, clicks }]) => ({
  //   full,
  //   short,
  //   clicks
  // }));
  res.render('index', { shortUrls: urlDatabase.getAll() }) // Placeholder, students will populate
})

app.post('/shortUrls', (req: Request, res: Response) => {
  // Capture the full URL from form input
  const { fullUrl } = req.body as { fullUrl: string }

  // Generate a unique short URL and store in urlDatabase
  const shortUrl = generate()

  try {
    urlDatabase.add(shortUrl, fullUrl)
    // Redirect back to home page
    res.status(302).redirect('/')
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.render('index', {
        shortUrls: urlDatabase.getAll(),
        error: error.message,
      })
    }
  }
})

app.get('/:shortUrl', (req: Request, res: Response) => {
  // Check if short URL exists in urlDatabase
  // Increment click count if found and redirect to full URL
  // Send 404 status if short URL not found
})

app.listen(3200, () => console.log('Server started!!!!'))
