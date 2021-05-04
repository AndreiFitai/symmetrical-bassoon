import RSMQWorker from 'rsmq-worker'
import { REDIS_URL, MAILSERVER_HOST, MAILSERVER_PORT } from './config'
import { QUEUE_NAME } from './constants'
import { sendEmail, generateTransporter } from './service/email'

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
		console.error(`Failed to send email: ${id}`)
		next()
	}
})

worker.on('error', function (err: any, msg: any) {
	console.log('ERROR', err, msg.id)
})

worker.on('exceeded', function (msg: any) {
	console.log('EXCEEDED', msg.id)
})

worker.on('timeout', function (msg: any) {
	console.log('TIMEOUT', msg.id, msg.rc)
})

worker.start()
