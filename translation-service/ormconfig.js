require('dotenv/config')

const entities = {
	dev: ['dist/**/*.entity.js', 'src/**/*.entity.ts'],
	prod: ['dist/**/*.entity.js'],
	test: ['dist/**/*.entity.js']
}

const logging =
	process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test'

module.exports = {
	type: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	logging: logging,
	entities: entities[process.env.NODE_ENV],
	migrations: ['dist/src/migrations/*.js'],
	migrationsTableName: 'migrations',
	cli: {
		migrationsDir: 'src/migrations'
	}
}
