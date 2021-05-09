import Pino from 'pino'
import { NODE_ENV } from './config'

const isDevelopment = NODE_ENV === 'dev'
const isTest = NODE_ENV !== 'test'

export const logger = Pino({
	enabled: true,
	prettyPrint: isDevelopment ? { colorize: true } : false,
	name: 'email-service',
	level: isDevelopment ? 'debug' : 'warn'
})
