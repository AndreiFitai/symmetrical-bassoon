import * as chai from 'chai'
import { parseFile } from '../../../src/helpers/file-helper'
import { createMulterFileArgs } from '../../testHelpers'

const expect = chai.expect

describe('File Helper', () => {
	describe('parseFile', () => {
		it('should read file correctly', () => {
			const args = createMulterFileArgs('test.txt')

			const result = parseFile(args)

			expect(result).to.be.a('string')
			expect(result).to.have.string('Arwen')
		})

		it('should read empty file  correctly', () => {
			const args = createMulterFileArgs('test-empty.txt')

			const result = parseFile(args)

			expect(result).to.be.a('string')
			// eslint-disable-next-line no-unused-expressions
			expect(result).to.be.empty
		})

		it('should return an error when there is no file', () => {
			const args = createMulterFileArgs('doesntexist.txt')

			expect(() => parseFile(args)).to.throw(/parseFile/)
		})
	})
})
