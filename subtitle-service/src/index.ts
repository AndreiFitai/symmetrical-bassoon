import { config } from 'dotenv'
import express, { Application } from 'express'

import { homeRoutes } from './routes/homeRoutes'

config()

const { PORT } = process.env

const app: Application = express()

app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)

app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`)
})
