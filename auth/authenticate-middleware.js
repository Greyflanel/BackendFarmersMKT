const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { username, password } = req.headers;
  const secret = process.env.JWT_SECRET || 'Greyflanel';
  if (username, password) {
    jwt.verify(username, password, secret, function(error, decodedToken) {
      if(error) {
        res.status(401).json({ you: 'shall not pass! 💀' });
      } else {
        req.token = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'Please login and try again!' })
  }
};
