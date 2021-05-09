import { parseAttachementData } from '../../../src/helpers/attachmentHelper'

describe('Email service', () => {
	describe('parseAttachmentData', () => {
		it('should process string correctly', () => {
			const args = { type: 'string', data: 'this is a test string' }
			const result = parseAttachementData(args)
			expect(result).toEqual('this is a test string')
		})

		it('should process buffer to string correctly', () => {
			const args = {
				type: 'Buffer',
				data: Buffer.from('this is a test string')
			}
			const result = parseAttachementData(args)
			expect(result).toEqual('this is a test string')
		})

		it('should process unkown data type correctly', () => {
			const args = {
				type: '',
				data: Buffer.from('this is a test string')
			}
			const result = parseAttachementData(args)
			expect(result).toEqual('this is a test string')
		})
	})
})
