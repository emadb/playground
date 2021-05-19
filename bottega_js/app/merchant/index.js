const db = require('../db')

const fn = async (server, _opts) => {
  server.route([
    get_shop, 
    update_shop,
    get_products,
    create_product
  ])
}

const get_shop = {
  method: 'GET',
  path: '/my-shop',
  handler: async (req, _h) => {
    const user_id = req.auth.artifacts.user_id
    const shop = await db.getDb().shops.findOne({user_id: user_id})
    return shop
  }
}
const update_shop = {
  method: 'PUT',
  path: '/my-shop',
  handler: async (req, _h) => {
    const shop_id = req.auth.artifacts.shop_id
    const shop_data = {
      name: payload.name,
      description: payload.description,
      address: payload.address,
      tags: payload.tags
    }
    await db.getDb().shops.update(shop_id, shop_data)
    const shop = await db.getDb().shops.findOne({id: shop_id})
    return shop
  }
}

const get_products = {
  method: 'GET',
  path: '/my-shop/products',
  handler: async (req, _h) => {
    const shop_id = req.auth.artifacts.shop_id
    const shop = await db.getDb().products.find({shop_id: shop_id})
    return shop
  }
}

const create_product = {
  method: 'POST',
  path: '/my-shop/product',
  handler: async (req, _h) => {
    const shop_id = req.auth.artifacts.shop_id
    const product_data = {
      shop_id: shop_id,
      name: payload.name,
      description: payload.description,
      image: payload.image,
      price: payload.price,
      um: payload.um,
      tags: payload.tags
    }
    const shop = await db.getDb().products.insert(product_data)
    return shop
  }
}


module.exports = {
  name: 'merchant',
  version: '0.0.1',
  prefix: '/merchant',
  register: fn
}