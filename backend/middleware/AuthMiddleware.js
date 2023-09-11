const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your secret key (process.env.SECRET)
    const decoded = jwt.verify(token, process.env.SECRET);

    // Attach the decoded token payload to the request object
    req.user = decoded;
    
    console.log('req user',req.user)

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

// const checkRole = (role) => {
//   return (req, res, next) => {
//     // Check if the user has the required role
//     if (req.user && req.user.role === role) {
//       next();
//     } else {
//       return res.status(403).json({ message: 'Access denied. Insufficient role privileges.' });
//     }
//   };
// };

module.exports = { verifyToken };
