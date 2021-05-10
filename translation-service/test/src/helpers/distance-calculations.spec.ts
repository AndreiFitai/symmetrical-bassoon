import { calculateEditDistance } from '../../../src/helpers/distance-calculations'

describe('Distance calculations helper', () => {
	describe('calculateEditDistance', () => {
		it('should return 0 if strings are equal', () => {
			const string1 = 'test'
			const string2 = 'test'

			const result = calculateEditDistance(string1, string2)

			expect(result).toBe(0)
		})

		it('should return 3 if two operations are necesary to match strings', () => {
			const string1 = 'test'
			const string2 = 'taxi'

			const result = calculateEditDistance(string1, string2)

			expect(result).toBe(3)
		})
	})
})
