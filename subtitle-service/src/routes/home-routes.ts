import { Request, Response, Router } from 'express'
import path from 'path'
import multer from 'multer'
import { checkForRequestErrors } from '../helpers/validators'
import { translateAndEmailResult } from '../services/translation'

const router: Router = Router()

const upload = multer({ dest: 'tmp/' })

router.get('/', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public', 'index.html'))
})

router.post(
	'/',
	upload.single('subtitle'),
	async (req: Request, res: Response) => {
		const validationErrors = checkForRequestErrors(req, res)

		if (validationErrors) {
			return validationErrors
		}

		translateAndEmailResult(req.body.email, req.body.language, req.file)

		return res
			.status(200)
			.send('You will shortly receive an email with the translated subtitles!')
	}
)

export const homeRoutes: Router = router
