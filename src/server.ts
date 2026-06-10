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
  const shortUrls = urlDatabase.getAll()
  res.render('index', { shortUrls }) // Placeholder, students will populate
})

app.post('/shortUrls', (req: Request, res: Response) => {
  // Capture the full URL from form input
  const { fullUrl } = req.body as { fullUrl: string }

  // Generate a unique short URL and store in urlDatabase
  const shortUrl = generate()

  try {
    urlDatabase.add(shortUrl, fullUrl)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.render('index', {
        shortUrls: urlDatabase.getAll(),
        error: error.message,
      })
    }
  } finally {
    // Redirect back to home page
    res.status(302).redirect('/')
  }
})

app.get('/:shortUrl', (req: Request, res: Response) => {
  // Check if short URL exists in urlDatabase
  const { shortUrl } = req.params as { shortUrl: string }

  try {
    const existsUrl = urlDatabase.find(shortUrl)
    // Increment click count if found and redirect to full URL
    urlDatabase.incrementClicks(shortUrl)
    res.redirect(existsUrl.fullUrl)
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Send 404 status if short URL not found
      res.status(404).send(error.message)
    }
  }
})

app.listen(3200, () => console.log('Server started!!!!'))
