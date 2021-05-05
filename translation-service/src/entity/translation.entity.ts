import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Translation {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	targetLanguage: string

	@Column()
	sourceLanguage: string

	@Column()
	target: string

	@Column()
	source: number
}
