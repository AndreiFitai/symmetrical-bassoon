export const emailResults = (
	email: String,
	messagePayload: string,
	attachment?: Buffer
) => {
	console.log(email)
	console.log(messagePayload)
	if (attachment) {
		console.log(attachment.toString('utf-8'))
	}
}
