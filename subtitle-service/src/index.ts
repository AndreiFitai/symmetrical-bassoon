import express, { Application } from 'express'
import { homeRoutes } from './routes/home-routes'
import { PORT } from './config'

const app: Application = express()

app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)

app.listen(PORT, () => {
	console.log(`Subtitle service started at http://localhost:${PORT}`)
})
