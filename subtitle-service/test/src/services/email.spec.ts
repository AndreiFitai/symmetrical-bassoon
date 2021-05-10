import { emailResults } from '../../../src/services/email'
import { rsmq } from '../../../src/rsmq'

const mockSendMessage = (rsmq.sendMessage = jest.fn())

afterEach(() => {
	mockSendMessage.mockClear()
})

describe('Email queue service', () => {
	it('it sends message to queue without attachment', () => {
		const message = {
			from: 'Subtitles Translator <subtitles@translator.com>',
			to: 'test@test.com',
			subject: 'Subtitles have been translated !',
			emailContent: 'success'
		}

		const result = { qname: 'send-email', message: JSON.stringify(message) }

		emailResults(message)

		expect(mockSendMessage.mock.calls[0][0]).toEqual(result)
	})

	it('it sends message to queue with attachment', () => {
		const message = {
			from: 'Subtitles Translator <subtitles@translator.com>',
			to: 'test@test.com',
			subject: 'Subtitles have been translated !',
			emailContent: 'success',
			attachment: Buffer.from(
				JSON.stringify({ type: 'text/plain', data: 'i love to test' })
			)
		}
		const result = { qname: 'send-email', message: JSON.stringify(message) }

		emailResults(message)

		expect(mockSendMessage.mock.calls[0][0]).toEqual(result)
	})
})
