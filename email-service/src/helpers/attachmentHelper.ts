import { logger } from '../logger'

export const parseAttachementData = ({
	type,
	data
}: {
	type: string
	data: any
}) => {
	if (['string', 'text', 'text/plain'].includes(type)) {
		return data
	}

	if (type === 'Buffer') {
		return Buffer.from(data).toString('utf8')
	}
	logger.warn('Unkown attachment data type - parsing anyways')
	return data.toString()
}
