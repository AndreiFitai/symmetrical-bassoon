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
