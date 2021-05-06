import { Readable } from 'stream'

export function createMulterFileArgs(filename: string) {
	const args: Express.Multer.File = {
		fieldname: 'test',
		originalname: filename,
		encoding: '7bit',
		mimetype: 'text/plain',
		destination: 'tmp/',
		filename: filename,
		path: `test/testHelpers/${filename}`,
		size: 170,
		buffer: Buffer.from(''),
		stream: new Readable()
	}
	return args
}

export const testString = `1 [00:00:12.00 - 00:01:20.00] I am Arwen - I've come to help you.
2 [00:03:55.00 - 00:04:20.00] Come back to the light.
3 [00:04:59.00 - 00:05:30.00] Nooo, my precious!!.`

export const translatedUnits = [
	{
		id: 2,
		timeFrame: '[00:03:55.00 - 00:04:20.00]',
		text: 'How are you doing ?',
		translation: 'Wie gehts ?'
	},
	{
		id: 1,
		timeFrame: '[00:00:12.00 - 00:01:20.00]',
		text: 'Hello world!',
		translation: 'Hallo Welt!'
	}
]

export const expectedTranslatedSubs = `1 [00:00:12.00 - 00:01:20.00] Hallo Welt!
2 [00:03:55.00 - 00:04:20.00] Wie gehts ?
`
