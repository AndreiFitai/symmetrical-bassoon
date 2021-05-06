import 'reflect-metadata'
import express, { Application } from 'express'
import { createConnection } from 'typeorm'
import { homeRoutes } from './routes/home-routes'
import { PORT } from './config'
import { logger } from './logger'

const app: Application = express()

createConnection()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)

app.listen(PORT, () => {
	logger.info(`Translation service started at http://localhost:${PORT}`)
})
