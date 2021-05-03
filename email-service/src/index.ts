import express, { Application, Request, Response } from 'express'
import { PORT } from './config'

const app: Application = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
	res.send('Hello world!')
})

app.listen(PORT, () => {
	console.log(`email-service server started at http://localhost:${PORT}`)
})
