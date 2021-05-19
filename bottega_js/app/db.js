const massive = require('massive')
const settings = require('./settings')
let db = null

const connect = () => {
  if (db) {
    return Promise.resolve(db);
  }

  return massive(settings.databaseUrl).then(instance => {
    db = instance;
    return Promise.resolve(db);
  }).catch(err => {
    return err;
  });
};

module.exports = {
  connect: connect,
  getDb: () => { return db },
  close: () => { db.instance.$pool.end() }
}

