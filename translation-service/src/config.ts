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

const PORT = env('PORT')
const NODE_ENV = env('NODE_ENV')

export { PORT, NODE_ENV }
