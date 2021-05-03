import express, { Application } from 'express'
import { homeRoutes } from './routes/homeRoutes'
import { PORT } from './config'

const app: Application = express()

app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)

app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`)
})
