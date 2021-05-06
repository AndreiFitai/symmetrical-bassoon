require('dotenv/config')

const entities = {
	dev: ['dist/**/*.entity.js', 'src/**/*.entity.ts'],
	prod: ['dist/**/*.entity.js'],
	test: ['dist/**/*.entity.js']
}

module.exports = {
	type: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	logging: true,
	entities: entities[process.env.NODE_ENV],
	migrations: ['dist/migrations/*.js'],
	migrationsTableName: 'migrations',
	cli: {
		migrationsDir: '/migrations'
	}
}
