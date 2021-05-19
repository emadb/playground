const Postgrator = require('postgrator')
const settings = require('./app/settings')

function migrate(migration = '') {
  const postgrator = new Postgrator({
    migrationDirectory: './migrations',
    driver: 'pg',
    connectionString: settings.databaseUrl,
    schemaTable: 'schemaversion',
    ssl: process.env.NODE_ENV === 'production'
  });

  return postgrator
    .migrate(migration)
}

if (require.main === module) {
  console.log(`RUNNING MIGRATOR IN ${process.env.NODE_ENV || 'dev'} ENV`);
  migrate(process.argv[2])
    .then(appliedMigrations => console.log(appliedMigrations))
    .catch(error => console.log(error));
} else {
  module.exports = migrate;
}
