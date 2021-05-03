import express, { Application, Request, Response } from 'express'
import { PORT } from './config'

const app: Application = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
	res.send('Hello world!')
})

app.post('/translate', (req: Request, res: Response) => {
	res.type('json').send(JSON.stringify(req.body))
})

app.listen(PORT, () => {
	console.log(`translation-service server started at http://localhost:${PORT}`)
})
