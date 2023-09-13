const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your secret key (process.env.SECRET)
    const decoded = jwt.verify(token, process.env.SECRET);

    const user =await User.findOne({ _id: decoded.userId }).populate('profession').populate('role').exec();
    // Attach the decoded token payload to the request object
    req.user = user;

    console.log('req user', req.user)

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};



const checkRole = (roles) => {
  return (req, res, next) => {
    // Check if the user has one of the required roles
    if (roles.includes(req.user.role.name)) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied. Insufficient role privileges.' });
    }
  };
};

module.exports = { verifyToken, checkRole };
