// import os from 'os'
import { SubsWithTranslation } from '../services/translation'
export interface SubtitleUnit {
	id: number
	timeFrame: string
	text: string
}

export const splitSubtitleData = (stringData: string): SubtitleUnit[] => {
	const subtitleUnits = stringData.split('\n')

	const processedSubtitles = subtitleUnits.map((subtitleUnit) => {
		if (subtitleUnit.indexOf('[') === -1 || subtitleUnit.indexOf(']') === -1)
			throw new Error('invalid subtitle format - cannot process text')

		const id = subtitleUnit.slice(0, subtitleUnit.indexOf('[') - 1)

		const timeFrame = subtitleUnit.slice(
			subtitleUnit.indexOf('['),
			subtitleUnit.indexOf(']') + 1
		)

		const text = subtitleUnit.slice(subtitleUnit.indexOf(']') + 1).trim()

		return { id: Number(id), timeFrame, text }
	})

	return processedSubtitles
}

export const rebuildTranslatedSubtitles = (
	subtitleUnits: SubsWithTranslation[]
): string => {
	const sortedUnits = subtitleUnits.sort(function (a, b) {
		return a.id - b.id
	})

	const rebuiltSubs = sortedUnits.map(({ id, timeFrame, translation }) => {
		return `${id} ${timeFrame} ${translation}\n`
	})

	return rebuiltSubs.join('')
}
