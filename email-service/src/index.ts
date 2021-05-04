import RSMQWorker from 'rsmq-worker'
import { REDIS_URL } from './config'
import { QUEUE_NAME } from './constants'

const worker = new RSMQWorker(QUEUE_NAME, { host: REDIS_URL })

worker.on('message', function (msg: any, next: any, id: any) {
	// process your message
	console.log('Message id : ' + id)
	console.log(msg)
	next()
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
