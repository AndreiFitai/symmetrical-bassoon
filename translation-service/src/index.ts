import 'reflect-metadata'
import express, { Application } from 'express'
import { createConnection } from 'typeorm'
import { homeRoutes } from './routes/home-routes'
import { PORT } from './config'

const app: Application = express()

createConnection()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)

app.listen(PORT, () => {
	console.log(`Translation service started at http://localhost:${PORT}`)
})
