import express, { Request, Response } from 'express'
import { urlencoded } from 'express'
import { generate } from 'shortid'

const app = express()

app.set('view engine', 'ejs')
app.use(urlencoded({ extended: true }))

// In-memory storage for URLs
const urlDatabase: Record<string, { full: string; clicks: number }> = {}

app.get('/', (req: Request, res: Response) => {
  // Render the list of shortened URLs and their stats here
  // const shortUrls = Object.entries(urlDatabase).map(([short, { full, clicks }]) => ({
  //   full,
  //   short,
  //   clicks
  // }));
  res.render('index', { shortUrls: [] }) // Placeholder, students will populate
})

app.post('/shortUrls', (req: Request, res: Response) => {
  // Capture the full URL from form input
  const { fullUrl } = req.body as { fullUrl: string }

  // Generate a unique short URL and store in urlDatabase
  const shortUrl = generate()
  urlDatabase[shortUrl] = {
    full: fullUrl,
    clicks: 0,
  }

  // Redirect back to home page
  res.status(302).redirect('/')
})

app.get('/:shortUrl', (req: Request, res: Response) => {
  // Check if short URL exists in urlDatabase
  // Increment click count if found and redirect to full URL
  // Send 404 status if short URL not found
})

app.listen(3200, () => console.log('Server started!!!!'))
