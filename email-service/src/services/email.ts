import { createTransport } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { logger } from '../logger'
import { parseAttachementData } from '../helpers/attachmentHelper'

export default class Emailer {
	private transport: Mail

	constructor(host: string, port: number) {
		this.transport = createTransport({
			pool: true,
			host: host,
			port: port
		} as SMTPTransport.Options)
	}

	async sendEmail(msg: any) {
		const { email, messagePayload, attachment } = JSON.parse(msg)

		const message = {
			from: 'Subtitles Translator <subtitles@translator.com>',
			to: email,
			subject: 'Subtitles have been translated !',
			text: messagePayload,
			attachments: <{ filename: string; content: string }[]>[]
		}

		if (attachment) {
			const content = parseAttachementData(attachment)

			message.attachments.push({
				filename: 'subtitle.txt',
				content
			})
		}

		if (this.transport.isIdle()) {
			this.transport.sendMail(message, (err, info) => {
				if (err) {
					logger.error(`Error occurred: ${err.message}`)
					this.transport.close()
				}

				logger.info(`Message sent: ${info.messageId}`)
			})
		}
	}
}
