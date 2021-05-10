import { validateImportData } from '../../../src/helpers/validators'
import { translationUnit } from '../../testHelpers'

describe('Validators helper', () => {
	it('it returns true if translation unit is valid', () => {
		const result = validateImportData(translationUnit)

		expect(result).toBe(true)
	})

	it('it returns true if array of valid translations units is passed', () => {
		const result = validateImportData([translationUnit, translationUnit])

		expect(result).toBe(true)
	})

	it('it returns true if array of valid translations units is passed', () => {
		const result = validateImportData([translationUnit, translationUnit])

		expect(result).toBe(true)
	})

	it('it returns false if given empty array', () => {
		const result = validateImportData([])

		expect(result).toBe(false)
	})

	it('it returns false if no data present on any field', () => {
		const noTargetLanguage = { ...translationUnit, source: '' }

		const result = validateImportData(noTargetLanguage)

		expect(result).toBe(false)
	})

	it('it returns false if target language not supported', () => {
		const noTargetLanguage = { ...translationUnit, targetLanguage: 'zh' }

		const result = validateImportData(noTargetLanguage)

		expect(result).toBe(false)
	})

	it('it returns false if source language not supported', () => {
		const noTargetLanguage = { ...translationUnit, sourceLanguage: 'zh' }

		const result = validateImportData(noTargetLanguage)

		expect(result).toBe(false)
	})
})
