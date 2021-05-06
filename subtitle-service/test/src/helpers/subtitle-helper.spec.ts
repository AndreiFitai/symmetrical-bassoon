import * as chai from 'chai'
import {
	splitSubtitleData,
	rebuildTranslatedSubtitles
} from '../../../src/helpers/subtitle-helper'
import {
	testString,
	translatedUnits,
	expectedTranslatedSubs
} from '../../testHelpers'

const expect = chai.expect

describe('Subtitle helper', () => {
	describe('splitSubtitleData', () => {
		it('should split subtitle string correctly', () => {
			const result = splitSubtitleData(testString)

			expect(result).to.be.a('array')
			expect(result[0].id).to.equal(1)
			expect(result[0].timeFrame).to.equal('[00:00:12.00 - 00:01:20.00]')
			expect(result[0].text).to.contain('Arwen')
		})

		it('should throw an error when subtitle format is incorrect', () => {
			expect(() => splitSubtitleData('hello world!')).to.throw(
				'invalid subtitle format'
			)
		})
	})

	describe('rebuildTranslatedSubtitles', () => {
		it('should build subtitle text from translated units', () => {
			const result = rebuildTranslatedSubtitles(translatedUnits)

			expect(result).to.be.a('string')
			expect(result).to.equal(expectedTranslatedSubs)
		})

		it('should panic', () => {
			expect(() => splitSubtitleData('hello world!')).to.throw(
				'invalid subtitle format'
			)
		})
	})
})
