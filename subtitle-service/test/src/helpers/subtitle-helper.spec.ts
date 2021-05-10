import {
	splitSubtitleData,
	rebuildTranslatedSubtitles
} from '../../../src/helpers/subtitle-helper'
import {
	testString,
	translatedUnits,
	expectedTranslatedSubs
} from '../../testHelpers'

describe('Subtitle helper', () => {
	describe('splitSubtitleData', () => {
		it('should split subtitle string correctly', () => {
			const result = splitSubtitleData(testString)

			expect(Array.isArray(result)).toBe(true)
			expect(result[0].id).toEqual(1)
			expect(result[0].timeFrame).toEqual('[00:00:12.00 - 00:01:20.00]')
			expect(result[0].text).toContain('Arwen')
		})

		it('should throw an error when subtitle line is missing timeframe', () => {
			expect(() => splitSubtitleData('hello world!')).toThrow(
				'missing line timeframe'
			)
		})

		it('should throw an error when subtitle line is missing id', () => {
			expect(() =>
				splitSubtitleData('[01:00:00 - 01:00:005] hello world!')
			).toThrow('missing line id')
		})
	})

	describe('rebuildTranslatedSubtitles', () => {
		it('should build subtitle text from translated units', () => {
			const result = rebuildTranslatedSubtitles(translatedUnits)

			expect(typeof result).toBe('string')
			expect(result).toEqual(expectedTranslatedSubs)
		})

		it('should throw when subtitle format is not correct', () => {
			expect(() => splitSubtitleData('hello world!')).toThrow(
				'invalid subtitle format'
			)
		})
	})
})
