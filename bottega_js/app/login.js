const bcrypt = require('bcrypt')
const db = require('./db')
const jwt = require('jsonwebtoken')

const fn = async (server, _opts) => {
  server.route({
    method: 'POST',
    path: '/login',
    config: { auth: false },
    handler: async (req, _h) => {
      return findUser(req.payload.email, req.payload.password).then(user => {
        return {token: createToken(user)} 
      }).catch(_ => {
        return {message: 'username or password'}
      })
    }
  })
}

const createToken = (user) => {
  const data = { user_id: user.id }
  const token  = jwt.sign(data, 'SUPER-SECRET', { algorithm: 'HS512'})
  return token
}

const findUser = (email, password) => {
  return db.getDb().users.findOne({email: email.toLocaleLowerCase()}).then(user => {
    if (user) {
      return verifyPassword(user, password)
    } else{
      return Promise.reject('wrong username or email')
    }
  })
}

const verifyPassword = (user, password) =>  {  
  return bcrypt.compare(password, user.password).then(res => {
    if (res) {
      delete user.password
      return user
    }
  })
} 


module.exports = {
  name: 'login',
  version: '0.0.1',
  register: fn
}