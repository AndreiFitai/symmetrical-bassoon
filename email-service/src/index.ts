import RSMQWorker from 'rsmq-worker'
import { REDIS_URL, MAILSERVER_HOST, MAILSERVER_PORT } from './config'
import { QUEUE_NAME } from './constants'
import { sendEmail, generateTransporter } from './services/email'
import { logger } from './logger'

const worker = new RSMQWorker(QUEUE_NAME, { host: REDIS_URL })

const transporter = generateTransporter(
	MAILSERVER_HOST,
	Number(MAILSERVER_PORT)
)

worker.on('message', function (msg: any, next: any, id: string) {
	try {
		sendEmail(msg, transporter)
		next()
	} catch (err) {
		logger.error(`Failed to send email: ${id}`)
		next()
	}
})

worker.on('error', function (err: any, msg: any) {
	logger.erro('ERROR', err, msg.id)
})

worker.on('exceeded', function (msg: any) {
	logger.warn('EXCEEDED', msg.id)
})

worker.on('timeout', function (msg: any) {
	logger.warn('TIMEOUT', msg.id, msg.rc)
})

worker.start()
logger.info(`Email server listening for events !`)
