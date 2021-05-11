import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTranslationTable1620256110323 implements MigrationInterface {
	name = 'AddTranslationTable1620256110323'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE `translation` (`id` varchar(36) NOT NULL, `targetLanguage` varchar(255) NOT NULL, `sourceLanguage` varchar(255) NOT NULL, `target` varchar(255) NOT NULL, `source` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE `translation`')
	}
}
