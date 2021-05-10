import { config } from 'dotenv'

config()

function env(name: string): string {
	if (name !== 'NODE_ENV' && process.env.NODE_ENV === 'test') return name

	const value = process.env[name]

	if (!value) {
		throw new Error(`Missing: process.env['${name}'].`)
	}

	return value
}

const REDIS_URL = env('REDIS_URL')
const MAILSERVER_HOST = env('MAILSERVER_HOST')
const MAILSERVER_PORT = env('MAILSERVER_PORT')
const NODE_ENV = env('NODE_ENV')

export { REDIS_URL, MAILSERVER_HOST, MAILSERVER_PORT, NODE_ENV }
