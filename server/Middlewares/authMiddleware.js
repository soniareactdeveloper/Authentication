var jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
  const token = req.header("authorization")

  try {
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err){
        return res.status(400).send("Bad request!")
      }
      if(decoded.data){
        req.user = decoded.data
        next()
      }
     });
    }else {
      return res.status(400).send("Bad request!")
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = authMiddleware