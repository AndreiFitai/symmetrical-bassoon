import { SubtitleUnit, splitSubtitleData } from '../helpers/subtitleHelper'
import axios from 'axios'
import { API_TRANSLATE } from '../config'
import { TRANSLATE_ENDPOINT } from '../constants'
import { parseFile } from '../helpers/fileHelper'
import { emailResults } from './email'

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

		const subtitleUnits = splitSubtitleData(fileData)

		const translatedSubtitles = await translateSubtitles(subtitleUnits)

		emailResults({
			email,
			messagePayload: 'success',
			attachment: Buffer.from(JSON.stringify(translatedSubtitles))
		})
	} catch (error) {
		emailResults({ email, messagePayload: `something went wrong :${error}` })
	}
}
