import { config } from 'dotenv'

config()

function env(name: string): string {
	const value = process.env[name]

	if (!value) {
		throw new Error(`Missing: process.env['${name}'].`)
	}

	return value
}

const REDIS_URL = env('REDIS_URL')
const MAILSERVER_HOST = env('MAILSERVER_HOST')
const MAILSERVER_PORT = env('MAILSERVER_PORT')

export { REDIS_URL, MAILSERVER_HOST, MAILSERVER_PORT }
