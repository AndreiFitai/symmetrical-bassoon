interface Map {
	[key: string]: string | undefined
}

export interface TranslationUnit extends Map {
	source: string
	target: string
	sourceLanguage: string
	targetLanguage: string
}
