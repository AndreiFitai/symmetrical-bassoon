import { getRepository } from 'typeorm'
import { Translation } from '../entity/translation.entity'
import { calculateEditDistance } from '../helpers/distance-calculations'

export const saveTranslations = async (
	data: Translation[]
): Promise<Translation[]> => {
	const translationRepository = getRepository(Translation)
	try {
		const result = await translationRepository.save(data)
		return result
	} catch (error) {
		throw new Error(`Could not save translations to DB: ${error}`)
	}
}

function findTranslation(text: string, allTranslations: Translation[]): string {
	if (!allTranslations) return text

	const translationUnitsWithScores = allTranslations.map((translation) => {
		const result = {
			score: calculateEditDistance(translation.source, text)
		}
		return Object.assign(result, translation)
	})

	const minScore = Math.min(
		...translationUnitsWithScores.map((item) => item.score)
	)

	if (minScore >= 5) return text

	const lowestScoredTranslationTranslation = translationUnitsWithScores.filter(
		(item) => item.score === minScore
	)

	return lowestScoredTranslationTranslation[0].target
}

export const translateStrings = async (
	data: { text: string }[],
	targetLanguage: string
) => {
	const translationRepository = getRepository(Translation)

	const allTargetLanguageTranslations = await translationRepository.find({
		where: { targetLanguage }
	})

	const resultingData = data.map((textUnit: { text: string }) => {
		const translation = findTranslation(
			textUnit.text,
			allTargetLanguageTranslations
		)
		return Object.assign({ translation }, textUnit)
	})

	return resultingData
}
