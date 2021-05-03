import { Request, Response, Router } from 'express'
import path from 'path'
import multer from 'multer'
import * as EmailValidator from 'email-validator'
import { parseFile } from '../helpers/parseHelper'
import { processSubtitleData } from '../helpers/subtitleHelper'

const router: Router = Router()

const upload = multer({ dest: 'tmp/' })

router.get('/', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public', 'index.html'))
})

router.post('/', upload.single('subtitle'), (req: Request, res: Response) => {
	if (req?.file?.mimetype !== 'text/plain') {
		return res.send('Wrong file type uploaded. Please upload a .txt file')
	}

	if (!EmailValidator.validate(req?.body?.email)) {
		return res.send('Please provide a valid email address ')
	}

	const fileData = parseFile(req.file)
	const subtitleData = processSubtitleData(fileData)
	console.log('-----subtitleData-----', subtitleData)

	return res
		.status(200)
		.send('You will shortly receive an email with the translated subtitles!')
})

export const homeRoutes: Router = router
