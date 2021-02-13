const jwt = require('jsonwebtoken');
const redis = require("redis");
//set up redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (db, bcrypt, req, res) => {
  const { password, email } = req.body;
  return db.select('email', 'hash').from('login').where('email', '=', email)
    .then(data => {
      if (bcrypt.compareSync(password, data[0].hash)) {
        return db.select('*').from('users').where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject("unable to get user!"))
      } else {
        Promise.reject("wrong credentials!");
      }
  })
  .catch(err => Promise.reject("wrong credentials!"));
}

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("unauthorized")
    } 
    return res.json({id: reply})
  })
}

const signToken = (email) => {
  const jwtPayload = { email };
  return token = jwt.sign(jwtPayload, 'JWT_SECRET' , {expiresIn: '2 days'});
}

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key,value))
}

const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => (
      { success: 'true', userId: id, token }
    ))
    .catch(console.log)
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  authorization ? getAuthTokenId(req,res) :
    handleSignin(db, bcrypt, req, res)
      .then(data => {
        return data.id && data.email ? createSession(data) :
          Promise.reject(data)
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err));
}

module.exports = signinAuthentication;