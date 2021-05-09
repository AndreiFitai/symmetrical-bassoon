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
		const leftBracketIndex = subtitleUnit.indexOf('[')
		const rightBracketIndex = subtitleUnit.indexOf(']')

		if (leftBracketIndex === -1 || rightBracketIndex === -1)
			throw new Error('invalid subtitle format: missing line timeframe')

		const id = subtitleUnit.slice(0, leftBracketIndex - 1)

		if (!Number(id)) throw new Error('invalid subtitle format: missing line id')

		const timeFrame = subtitleUnit.slice(
			leftBracketIndex,
			rightBracketIndex + 1
		)

		const text = subtitleUnit.slice(rightBracketIndex + 1).trim()

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
