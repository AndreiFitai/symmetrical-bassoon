import fs from 'fs'
import path from 'path'

export const parseFile = (file: Express.Multer.File) => {
	const inputPath: string = path.resolve(file.path)

	try {
		const fileData = fs.readFileSync(inputPath, 'utf-8')
		return fileData
	} catch (error) {
		throw new Error(`parseFile: Unable to read file: ${error}`)
	}
}
