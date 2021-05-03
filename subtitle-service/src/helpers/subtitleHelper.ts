interface SubtitleUnit {
	id: number
	timeFrame: string
	text: string
}

export const processSubtitleData = (stringData: string): SubtitleUnit[] => {
	const subtitleUnits = stringData.split('\n')

	const processedSubtitles = subtitleUnits.map((subtitleUnit) => {
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
