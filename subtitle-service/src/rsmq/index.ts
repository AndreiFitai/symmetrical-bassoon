import RedisSMQ from 'rsmq'
import { REDIS_URL } from '../config'
import { QUEUE_NAME } from '../constants'

export const rsmq = new RedisSMQ({ host: REDIS_URL, ns: 'rsmq' })

rsmq.createQueue({ qname: QUEUE_NAME }, (err, resp) => {
	if (err) {
		if (err.name !== 'queueExists') {
			console.error(err)
		} else {
			console.log(`The ${QUEUE_NAME} queue exists and that's ok :)`)
		}
	}

	if (resp === 1) {
		console.log('Queue created')
	}
})
