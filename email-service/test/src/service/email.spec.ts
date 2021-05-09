import {
	emailWithoutAttachment,
	emailWithAttachment
} from '../../testHelpers/index'

jest.mock('nodemailer')

const mockSendMail = jest.fn()

jest.mock('nodemailer', () => ({
	createTransport: jest.fn().mockReturnValue({
		sendMail: mockSendMail,
		isIdle: jest.fn().mockReturnValue(true)
	})
}))

afterEach(() => {
	mockSendMail.mockClear()
})

import Emailer from '../../../src/services/email'

describe('Email service', () => {
	it('it sends an email without attachment', async () => {
		const message = JSON.stringify({
			from: 'Subtitles Translator <subtitles@translator.com>',
			email: 'test@test.com',
			subject: 'Subtitles have been translated !',
			messagePayload: 'success'
		})

		const emailer = new Emailer('localhost', 1234)

		await emailer.sendEmail(message)

		expect(mockSendMail.mock.calls[0][0]).toEqual(emailWithoutAttachment)
	})

	it('it sends an email with attachment', async () => {
		const message = JSON.stringify({
			from: 'Subtitles Translator <subtitles@translator.com>',
			email: 'test@test.com',
			subject: 'Subtitles have been translated !',
			messagePayload: 'success',
			attachment: { type: 'text/plain', data: 'i love to test' }
		})

		const emailer = new Emailer('localhost', 1234)

		await emailer.sendEmail(message)

		expect(mockSendMail.mock.calls[0][0]).toEqual(emailWithAttachment)
	})
})
