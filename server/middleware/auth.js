import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'univo-super-secure-production-jwt-secret-key-2026';

export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  WORKER: 'WORKER',
  COOP_MANAGER: 'COOP_MANAGER',
  GOVT_ADMIN: 'GOVT_ADMIN'
};

/**
 * Generate authenticated JWT token for a user session.
 */
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Require valid JWT authentication token middleware.
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Bearer token required.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'InvalidToken',
      message: 'Session token has expired or is cryptographically invalid.'
    });
  }
}

/**
 * Require specific Role-Based Access Control (RBAC) permission.
 * Allowed roles: 'CUSTOMER', 'WORKER', 'COOP_MANAGER', 'GOVT_ADMIN'
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Access denied. Role '${req.user.role}' lacks authorization for this endpoint. Required roles: ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
}
