import { config } from 'dotenv'

config()

function env(name: string): string {
	const value = process.env[name]

	if (!value) {
		throw new Error(`Missing: process.env['${name}'].`)
	}

	return value
}

const PORT = env('PORT')
const API_TRANSLATE = env('API_TRANSLATE')
const REDIS_URL = env('REDIS_URL')
const NODE_ENV = env('NODE_ENV')

export { PORT, API_TRANSLATE, REDIS_URL, NODE_ENV }
