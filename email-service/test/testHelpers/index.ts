export const emailWithoutAttachment = {
	from: 'Subtitles Translator <subtitles@translator.com>',
	to: 'test@test.com',
	subject: 'Subtitles have been translated !',
	text: 'success',
	attachments: []
}

export const emailWithAttachment = {
	from: 'Subtitles Translator <subtitles@translator.com>',
	to: 'test@test.com',
	subject: 'Subtitles have been translated !',
	text: 'success',
	attachments: [{ filename: 'subtitle.txt', content: 'i love to test' }]
}
