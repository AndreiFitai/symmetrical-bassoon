import {
	SubtitleUnit,
	splitSubtitleData,
	rebuildTranslatedSubtitles
} from '../helpers/subtitle-helper'
import axios from 'axios'
import { API_TRANSLATE } from '../config'
import { TRANSLATE_ENDPOINT, FROM, SUBJECT, EMAILCONTENT } from '../constants'
import { parseFile } from '../helpers/file-helper'
import { emailResults } from './email'
export interface SubsWithTranslation extends SubtitleUnit {
	translation: string
}

const translateSubtitles = async (
	subtitleData: SubtitleUnit[],
	targetLanguage: string
): Promise<SubsWithTranslation[]> => {
	try {
		const { data } = await axios.post(`${API_TRANSLATE}${TRANSLATE_ENDPOINT}`, {
			subtitleData: subtitleData,
			targetLanguage: targetLanguage
		})

		return data
	} catch (error) {
		throw new Error(error.response.data)
	}
}

export const translateAndEmailResult = async (
	email: string,
	targetLanguage: string,
	file: Express.Multer.File
) => {
	try {
		const fileData = parseFile(file)

		const subtitleUnits = splitSubtitleData(fileData)

		const translatedSubtitles = await translateSubtitles(
			subtitleUnits,
			targetLanguage
		)

		const rebuiltSubtitles = rebuildTranslatedSubtitles(translatedSubtitles)

		emailResults({
			from: FROM,
			to: email,
			subject: SUBJECT.SUCCESS,
			emailContent: EMAILCONTENT,
			attachment: Buffer.from(rebuiltSubtitles, 'utf8')
		})
	} catch (error) {
		emailResults({
			from: FROM,
			to: email,
			subject: SUBJECT.ERROR,
			emailContent: `something went wrong :${error}`
		})
	}
}
