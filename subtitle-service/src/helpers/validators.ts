import { Request, Response } from 'express'
import * as EmailValidator from 'email-validator'

export const checkForRequestErrors = (
	req: Request,
	res: Response
): Response | false => {
	if (req?.file?.mimetype !== 'text/plain') {
		return res
			.status(400)
			.send('Wrong file type uploaded. Please upload a .txt file')
	}

	if (!EmailValidator.validate(req?.body?.email)) {
		return res.status(400).send('Please provide a valid email address ')
	}

	if (!req?.body?.language) {
		return res
			.status(400)
			.send('Please pick a language for subtitle translation')
	}

	return false
}
