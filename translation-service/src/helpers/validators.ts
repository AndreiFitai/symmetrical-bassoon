import { TRANSLATION_UNIT_KEYS } from '../constants'
import { TranslationUnit } from '../translation-unit.types'

const validateTranslationUnit = (unit: TranslationUnit) => {
	const keys = Object.keys(unit)
	for (const key of TRANSLATION_UNIT_KEYS) {
		if (!keys.includes(key)) return false
		if (!unit[key]) return false
	}
	return true
}

export const validateImportData = (
	data: TranslationUnit | TranslationUnit[]
) => {
	if (!Array.isArray(data)) return validateTranslationUnit(data)
	if (!data.length) return false

	for (const translationUnit of data) {
		if (!validateTranslationUnit(translationUnit)) return false
	}
	return true
}
