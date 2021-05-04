import { SubtitleUnit, processSubtitleData } from './subtitleHelper'
import axios from 'axios'
import { API_TRANSLATE } from '../config'
import { TRANSLATE_ENDPOINT } from '../constants'
import { parseFile } from './fileHelper'
import { emailResults } from './emailHelper'

const translateSubtitles = async (
	subtitleData: SubtitleUnit[]
): Promise<SubtitleUnit[]> => {
	const { data } = await axios.post(
		`${API_TRANSLATE}${TRANSLATE_ENDPOINT}`,
		subtitleData
	)

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

		emailResults({
			email,
			messagePayload: 'success',
			attachment: Buffer.from(JSON.stringify(translatedSubtitles))
		})
	} catch (error) {
		emailResults({ email, messagePayload: `something went wrong :${error}` })
	}
}
