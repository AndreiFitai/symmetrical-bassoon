import * as chai from 'chai'
import { checkForRequestErrors } from '../../../src/helpers/validators'
import { Request, Response } from 'express'

const expect = chai.expect

describe('File Helper', () => {
	describe('parseFile', () => {
		it('should read file correctly', () => {
			const req = {
				file: {
					mimetype: 'test/plain'
				},
				body: {
					email: `test@test.com`,
					language: 'de'
				}
			}
			const response = {
				status: (x: any) => console.log(x),
				send: (x: string) => console.log(x)
			}

			const result = checkForRequestErrors(req as Request, response as Response)

			expect(result).to.be.a('boolean')
			expect(result).to.equal(false)
		})
	})
})
