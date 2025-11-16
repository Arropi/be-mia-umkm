const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../repository/userRepository');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await getUserByEmail(decoded.email);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || !['admin', 'administrator'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Administrator role required.' });
  }
  next();
};

const authorizeAdminUmkm = (req, res, next) => {
  if (!req.user || (!['administrator', 'admin_umkm'].includes(req.user.role))) {
    return res.status(403).json({ message: 'Access denied. Administrator or Admin UMKM role required.' });
  }
  next();
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
  authorizeAdminUmkm
};