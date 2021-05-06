import RedisSMQ from 'rsmq'
import { REDIS_URL } from '../config'
import { QUEUE_NAME } from '../constants'
import { logger } from '../logger'

export const rsmq = new RedisSMQ({ host: REDIS_URL, ns: 'rsmq' })

rsmq.createQueue({ qname: QUEUE_NAME }, (err, resp) => {
	if (err) {
		if (err.name !== 'queueExists') {
			logger.error(err)
		} else {
			logger.info(`The ${QUEUE_NAME} queue exists and that's ok :)`)
		}
	}

	if (resp === 1) {
		logger.info('Queue created')
	}
})
