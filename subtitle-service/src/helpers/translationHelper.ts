import { SubtitleUnit, processSubtitleData } from './subtitleHelper'
import axios from 'axios'
import { TRANSLATION_API } from '../config'
import { parseFile } from './fileHelper'
import { emailResults } from './emailHelper'

const translateSubtitles = async (
	subtitleData: SubtitleUnit[]
): Promise<SubtitleUnit[]> => {
	const { data } = await axios.post(TRANSLATION_API, subtitleData)

	return data
}

export const translateAndEmailResult = async (
	email: string,
	file: Express.Multer.File
) => {
	try {
		const fileData = parseFile(file)
		const subtitleData = processSubtitleData(fileData)
		const translatedSubtitles = await translateSubtitles(subtitleData)
		emailResults(
			email,
			'success',
			Buffer.from(JSON.stringify(translatedSubtitles))
		)
	} catch (error) {
		emailResults(email, 'success')
	}
}
