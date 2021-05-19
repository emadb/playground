const db = require('../db')

const fn = async (server, _opts) => {
  server.route([
    search_products    
  ])
}

const search_products = {
  method: 'GET',
  path: '/products',
  handler: async (req, _h) => {
    const name = req.query.search
    const tags = req.query.tags.split(',')
    let query = "1=1"
    let index = 0
    if (name) {
      index++
      query = `AND name ILIKE $${index}`
    } 
     
    if (tags.length > 0) {
      index++
      query = query + ` AND $${index} & tags`
    }
    return await db.getDb().products.where(, [`${name}%`])
  }
}

module.exports = {
  name: 'ecommerce',
  version: '0.0.1',
  prefix: '/merchant',
  register: fn
}