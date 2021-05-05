import 'reflect-metadata'
import express, { Application, Request, Response } from 'express'
import { createConnection } from 'typeorm'
import { PORT } from './config'
import { validateImportData } from './helpers/validators'

const app: Application = express()

createConnection()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/import-data', async (req: Request, res: Response) => {
	if (!validateImportData(req.body)) {
		return res.status(400).send('Incomplete translation data provided')
	}
	// to implement adding data in db
	res.send('Added new translation data to the DB')
})

app.post('/translate', async (req: Request, res: Response) => {
	// implement search
	res.send('Hello woild')
})

app.listen(PORT, () => {
	console.log(`translation-service server started at http://localhost:${PORT}`)
})
