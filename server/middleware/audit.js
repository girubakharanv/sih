import crypto from 'crypto';

/**
 * UNIVO Audit Logging Middleware
 * 
 * Automatically captures mutating API requests (POST, PUT, PATCH, DELETE)
 * and records an immutable audit trail with client IP, user identity,
 * resource type, and payload SHA-256 hash.
 */
export function auditLogger(prismaClient) {
  return async (req, res, next) => {
    // Only log mutating requests
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const originalSend = res.send;

      res.send = function (data) {
        res.send = originalSend;

        // Perform async logging after response is sent
        try {
          const payloadString = JSON.stringify(req.body || {});
          const payloadHash = crypto.createHash('sha256').update(payloadString).digest('hex');

          const auditRecord = {
            userId: req.user?.id || null,
            action: `${req.method} ${req.baseUrl}${req.path}`,
            resourceType: req.baseUrl.replace('/api/', '').toUpperCase() || 'ROOT',
            ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
            userAgent: req.headers['user-agent'] || 'UNIVO-Client',
            payloadHash
          };

          if (prismaClient && prismaClient.auditLog) {
            prismaClient.auditLog.create({ data: auditRecord }).catch(() => {});
          }
        } catch (e) {
          // Non-blocking fail-safe
        }

        return res.send(data);
      };
    }

    next();
  };
}

export default auditLogger;
