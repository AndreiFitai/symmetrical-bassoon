import { Request, Response, Router } from 'express'
import path from 'path'
import multer from 'multer'
import * as EmailValidator from 'email-validator'
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
		if (req?.file?.mimetype !== 'text/plain') {
			return res
				.status(400)
				.send('Wrong file type uploaded. Please upload a .txt file')
		}

		if (!EmailValidator.validate(req?.body?.email)) {
			return res.status(400).send('Please provide a valid email address ')
		}

		translateAndEmailResult(req.body.email, req.file)

		return res
			.status(200)
			.send('You will shortly receive an email with the translated subtitles!')
	}
)

export const homeRoutes: Router = router
