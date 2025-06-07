import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js'; 

const secret = process.env.JWT_SECRET || 'default_secret_key';
export function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
}

export function isAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  next();
}
