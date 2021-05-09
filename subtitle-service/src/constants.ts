const QUEUE_NAME = 'send-email'
const TRANSLATE_ENDPOINT = '/translate'

const FROM = 'Subtitles Translator <subtitles@translator.com>'
const SUBJECT = {
	SUCCESS: 'Subtitles have been translated !',
	ERROR: "Subtitles couldn't be translated"
}
const EMAILCONTENT = 'Enjoy your translated subtitles !'

export { QUEUE_NAME, TRANSLATE_ENDPOINT, FROM, SUBJECT, EMAILCONTENT }
