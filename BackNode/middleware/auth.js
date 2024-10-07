const jwt = require("jsonwebtoken");

const extractUserId = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ success: false, msg: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header
  
  if (!token) {
    return res.status(401).json({ success: false, msg: 'Token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }
    req.userId = decoded.data; // Corrected here: Use decoded.data directly
    next();
  });
};

module.exports = extractUserId;
