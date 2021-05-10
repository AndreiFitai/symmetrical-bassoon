import { rsmq } from '../rsmq'
import { QUEUE_NAME } from '../constants'
import { logger } from '../logger'

export interface MailData {
	from: string
	to: string
	subject: string
	emailContent: string
	attachment?: Buffer
}

export const emailResults = ({
	from,
	to,
	subject,
	emailContent,
	attachment
}: MailData) => {
	const msg: MailData = {
		from,
		to,
		subject,
		emailContent
	}

	if (attachment) msg.attachment = attachment

	rsmq.sendMessage(
		{ qname: QUEUE_NAME, message: JSON.stringify(msg) },
		function (err: Error, res: string) {
			if (err) {
				logger.error(err)
				return
			}

			logger.info('Message sent. ID:', res)
		}
	)
}
