const redis = require("redis");
//set up redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("unauthorized");
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("unauthorized")
    } 
    console.log("you have passed!");
    return next()
  })
}

module.exports = {
  requireAuth
}