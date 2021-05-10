import axios from 'axios'
import { translateAndEmailResult } from '../../../src/services/translation'
import * as emailService from '../../../src/services/email'

import {
	createMulterFileArgs,
	translatedUnits,
	messageToQueue,
	errrorMessageToQueue
} from '../../testHelpers'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

let mockEmailResults: jest.SpyInstance<void, [emailService.MailData]>

afterEach(() => {
	mockEmailResults.mockClear()
})

describe('Translation service', () => {
	it('sends request to translation service and emails user', async () => {
		mockedAxios.post.mockImplementationOnce(() =>
			Promise.resolve({ data: translatedUnits })
		)

		mockEmailResults = jest
			.spyOn(emailService, 'emailResults')
			.mockImplementation()

		await translateAndEmailResult(
			'test@test.com',
			'de',
			createMulterFileArgs('test.txt')
		)

		expect(emailService.emailResults).toHaveBeenCalled()
		expect(mockEmailResults.mock.calls[0][0]).toEqual(messageToQueue)
	})

	it('sends error message in case translation service unreacheable', async () => {
		mockedAxios.post.mockRejectedValueOnce({
			response: { data: 'could not get translations' }
		})

		mockEmailResults = jest
			.spyOn(emailService, 'emailResults')
			.mockImplementation()

		await translateAndEmailResult(
			'test@test.com',
			'de',
			createMulterFileArgs('test.txt')
		)

		expect(emailService.emailResults).toHaveBeenCalled()
		expect(mockEmailResults.mock.calls[0][0]).toEqual(errrorMessageToQueue)
	})
})
