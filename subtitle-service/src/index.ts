import express, { Application } from 'express'
import { homeRoutes } from './routes/home-routes'
import { PORT } from './config'
import { logger } from './logger'

const app: Application = express()

app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)

app.listen(PORT, () => {
	logger.info(`Subtitle service started at http://localhost:${PORT}`)
})
