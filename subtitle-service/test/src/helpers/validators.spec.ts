import { checkForRequestErrors } from '../../../src/helpers/validators'
import { Request, Response } from 'express'

describe('File Helper', () => {
	describe('parseFile', () => {
		it('should read file correctly', () => {
			const req = {
				file: {
					mimetype: 'text/plain'
				},
				body: {
					email: `test@test.com`,
					language: 'de'
				}
			}

			const response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis()
			}

			const result = checkForRequestErrors(
				req as Request,
				(response as unknown) as Response
			)

			expect(result).toBe(false)
		})

		it('should throw an error when uploaded file is not .txt', () => {
			const req = {
				file: {
					mimetype: 'text/csv'
				}
			}

			const response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis()
			}

			const statusSpy = jest.spyOn(response, 'status')
			const sendSpy = jest.spyOn(response, 'send')

			checkForRequestErrors(req as Request, (response as unknown) as Response)

			expect(statusSpy).toHaveBeenCalledWith(400)
			expect(sendSpy).toHaveBeenCalledWith(
				'Wrong file type uploaded. Please upload a .txt file'
			)
		})

		it('should throw an error when email is not valid', () => {
			const req = {
				file: {
					mimetype: 'text/plain'
				},
				body: {
					email: 'test@test'
				}
			}

			const response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis()
			}

			const statusSpy = jest.spyOn(response, 'status')
			const sendSpy = jest.spyOn(response, 'send')

			checkForRequestErrors(req as Request, (response as unknown) as Response)

			expect(statusSpy).toHaveBeenCalledWith(400)
			expect(sendSpy).toHaveBeenCalledWith(
				'Please provide a valid email address'
			)
		})

		it('should throw an error when translation language not sent', () => {
			const req = {
				file: {
					mimetype: 'text/plain'
				},
				body: {
					email: 'test@test.com'
				}
			}

			const response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis()
			}

			const statusSpy = jest.spyOn(response, 'status')
			const sendSpy = jest.spyOn(response, 'send')

			checkForRequestErrors(req as Request, (response as unknown) as Response)

			expect(statusSpy).toHaveBeenCalledWith(400)
			expect(sendSpy).toHaveBeenCalledWith(
				'Please pick a language for subtitle translation'
			)
		})
	})
})
