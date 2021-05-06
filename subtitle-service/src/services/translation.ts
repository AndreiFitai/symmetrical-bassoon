import {
	SubtitleUnit,
	splitSubtitleData,
	rebuildTranslatedSubtitles
} from '../helpers/subtitle-helper'
import axios from 'axios'
import { API_TRANSLATE } from '../config'
import { TRANSLATE_ENDPOINT } from '../constants'
import { parseFile } from '../helpers/file-helper'

import { emailResults } from './email'
export interface SubsWithTranslation extends SubtitleUnit {
	translation: string
}

const translateSubtitles = async (
	subtitleData: SubtitleUnit[],
	targetLanguage: string
): Promise<SubsWithTranslation[]> => {
	const { data } = await axios.post(`${API_TRANSLATE}${TRANSLATE_ENDPOINT}`, {
		subtitleData: subtitleData,
		targetLanguage: targetLanguage
	})

	return data
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
			email,
			messagePayload: 'success',
			attachment: Buffer.from(rebuiltSubtitles, 'utf8')
		})
	} catch (error) {
		emailResults({ email, messagePayload: `something went wrong :${error}` })
	}
}
