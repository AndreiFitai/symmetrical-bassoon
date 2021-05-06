import Pino from 'pino'
import { NODE_ENV } from './config'

const isDevelopment = NODE_ENV === 'dev'

export const logger = Pino({
	prettyPrint: isDevelopment ? { colorize: true } : false,
	name: 'email-service',
	level: isDevelopment ? 'debug' : 'warn'
})
