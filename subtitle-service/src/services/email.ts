import { rsmq } from '../rsmq'
import { QUEUE_NAME } from '../constants'
import { logger } from '../logger'
export interface MailData {
	email: string
	messagePayload: string
	attachment?: Buffer
}

export const emailResults = ({
	email,
	messagePayload,
	attachment
}: MailData) => {
	const msg: MailData = {
		email,
		messagePayload
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
