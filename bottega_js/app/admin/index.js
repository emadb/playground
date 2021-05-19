
const fn = async (server, _opts) => {
  server.route({
    method: 'GET',
    path: '/admin/shop',
    handler: async (request, _h) => {
      return {shop: 'ciao'}
    }
  })
}

module.exports = {
  name: 'devices',
  version: '0.0.1',
  register: fn
}