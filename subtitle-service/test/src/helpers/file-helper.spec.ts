import { parseFile } from '../../../src/helpers/file-helper'
import { createMulterFileArgs } from '../../testHelpers'

describe('File Helper', () => {
	describe('parseFile', () => {
		it('should read file correctly', () => {
			const args = createMulterFileArgs('test.txt')

			const result = parseFile(args)

			expect(typeof result).toBe('string')
			expect(result).toContain('Arwen')
		})

		it('should read empty file  correctly', () => {
			const args = createMulterFileArgs('test-empty.txt')

			const result = parseFile(args)

			expect(result).toEqual('')
		})

		it('should return an error when there is no file', () => {
			const args = createMulterFileArgs('doesntexist.txt')

			expect(() => parseFile(args)).toThrowError(/parseFile/)
		})
	})
})
