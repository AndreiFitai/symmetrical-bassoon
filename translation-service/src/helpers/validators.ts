import {
	TRANSLATION_UNIT_KEYS,
	LANGUAGES,
	LANGUAGE_VARIABLES
} from '../constants'
import { TranslationUnit } from '../translation-unit.types'

const validateTranslationUnit = (unit: TranslationUnit) => {
	const keys = Object.keys(unit)
	for (const key of TRANSLATION_UNIT_KEYS) {
		if (!keys.includes(key)) return false
		if (!unit[key]) return false

		if (LANGUAGE_VARIABLES.includes(key)) {
			if (!LANGUAGES.includes(unit[key]!)) return false
		}
	}

	return true
}

export const validateImportData = (
	data: TranslationUnit | TranslationUnit[]
) => {
	if (!Array.isArray(data)) return validateTranslationUnit(data)
	if (!data.length) return false

	for (let i = 0; i < data.length; i++) {
		if (!validateTranslationUnit(data[i])) return false
	}

	return true
}
