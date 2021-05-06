import { getRepository, Repository } from 'typeorm'
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

async function findTranslation(
	text: string,
	targetLanguage: string,
	repo: Repository<Translation>
): Promise<string> {
	const allTargetLanguageTranslations = await repo.find({
		where: { targetLanguage }
	})

	if (!allTargetLanguageTranslations) return text

	const translationUnitsWithScores = allTargetLanguageTranslations.map(
		(translation) => {
			const result = {
				score: calculateEditDistance(translation.source, text)
			}
			return Object.assign(result, translation)
		}
	)

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

	const resultArr: Promise<string>[] = []

	const resultingData = data.map((textUnit: { text: string }) => {
		resultArr.push(
			findTranslation(textUnit.text, targetLanguage, translationRepository)
		)

		const tempObj: { translation: string | Promise<string> } = {
			translation: ''
		}

		const result = Object.assign(tempObj, textUnit)

		return result
	})

	await Promise.all(resultArr).then((what) => {
		what.forEach((text, index) => {
			resultingData[index].translation = text
		})
	})

	return resultingData
}
