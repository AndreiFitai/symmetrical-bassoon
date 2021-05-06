import { Request, Response, Router } from 'express'
import { validateImportData } from '../helpers/validators'
import { saveTranslations, translateStrings } from '../services/translation'

const router: Router = Router()

router.post('/import-data', async (req: Request, res: Response) => {
	const { body } = req

	if (!validateImportData(body)) {
		return res.status(400).send('Incomplete translation data provided')
	}

	try {
		await saveTranslations(body)
	} catch (error) {
		res.status(400).send(`${error}`)
	}

	res.send('Added new translation data to the DB')
})

router.post('/translate', async (req: Request, res: Response) => {
	const {
		body: { subtitleData, targetLanguage }
	} = req

	try {
		const result = await translateStrings(subtitleData, targetLanguage)

		res.send(JSON.stringify(result))
	} catch (error) {
		res.status(400).send(`Issue occured translating text: ${error}`)
	}
})

export const homeRoutes: Router = router
