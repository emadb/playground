const Hapi = require('@hapi/hapi')
const db = require('./db')
const Bearer = require('hapi-auth-bearer-token')

const pinoOptions = {
  name: 'bottega-api',
  useLevelLabels: true,
  level: process.env.LOG_ONLY_ERRORS ?
    'error' :
    'info'
}

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(Bearer)

  server.auth.strategy('simple', 'bearer-access-token', {
    allowQueryToken: true,              // optional, false by default
    validate: async (request, token, h) => {

        const isValid = token === '1234'

        const credentials = { token }
        const artifacts = { user_id: 1, shop_id: 1 }

        return { isValid, credentials, artifacts }
    }
})

server.auth.default('simple')

  
  await server.register([{
      plugin: require('hapi-pino'),
      options: Object.assign(pinoOptions, {
        logEvents: ['onPostStart', 'onPostStop', 'response']
      })
    },
    require('./login'),
  ])

  await server.register([require('./merchant/index')], {routes: {prefix: '/merchant'}})
  await server.register([require('./ecommerce/index')])

  server.route({
    method: 'GET',
    path: '/health',
    options: {auth: false},
    handler: (request, h) => {
      
      return {message: 'ok'};
    }
  });

  db.connect()

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();