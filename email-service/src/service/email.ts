import { createTransport } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const parseAttachementData = ({ type, data }: { type: string; data: any }) => {
	if (['string', 'text', 'text/plain'].includes(type)) {
		return data
	}
	if (type === 'Buffer') {
		return Buffer.from(data).toString('utf-8')
	}
	console.error('Unkown attachment data type - parsing anyways')
	return data.toString()
}

export const generateTransporter = (host: string, port: number): Mail => {
	return createTransport({
		pool: true,
		host: host,
		port: port
	} as SMTPTransport.Options)
}

export const sendEmail = async (msg: any, transporter: Mail) => {
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
	if (transporter.isIdle()) {
		transporter.sendMail(message, (err, info) => {
			if (err) {
				console.log(`Error occurred: ${err.message}`)
				transporter.close()
			}

			console.log(`Message sent: ${info.messageId}`)
		})
	}
}
