import { Router, Request, Response } from 'express';
import { generateDocsHTML, Route } from '../utils/apiDocs';

const router = Router();

const routes: Route[] = [
  { method: 'GET', path: '/health' },

  { method: 'POST', path: '/api/auth/send-otp' },
  { method: 'POST', path: '/api/auth/send-login-otp' },
  { method: 'POST', path: '/api/auth/verify-otp' },
  { method: 'POST', path: '/api/auth/admin/login' },

  { method: 'GET', path: '/api/public/countries' },
  { method: 'GET', path: '/api/public/visa-types' },
  { method: 'POST', path: '/api/public/contact' },

  { method: 'GET', path: '/api/user/dashboard' },
  { method: 'GET', path: '/api/user/applications' },
  { method: 'POST', path: '/api/user/applications' },
  { method: 'GET', path: '/api/user/applications/:id' },
  { method: 'POST', path: '/api/user/applications/:id/documents' },
  { method: 'POST', path: '/api/user/applications/:id/documents/from-vault' },
  { method: 'PUT', path: '/api/user/applications/:id/payment' },
  { method: 'GET', path: '/api/user/vault' },
  { method: 'POST', path: '/api/user/vault' },
  { method: 'GET', path: '/api/user/vault/:id/url' },
  { method: 'DELETE', path: '/api/user/vault/:id' },
  { method: 'GET', path: '/api/user/payments' },
  { method: 'GET', path: '/api/user/payments/:id/receipt' },
  { method: 'GET', path: '/api/user/notifications' },
  { method: 'PUT', path: '/api/user/notifications/read-all' },
  { method: 'PUT', path: '/api/user/notifications/:id/read' },
  { method: 'DELETE', path: '/api/user/notifications/all' },
  { method: 'DELETE', path: '/api/user/notifications/:id' },

  { method: 'GET', path: '/api/admin/dashboard' },
  { method: 'GET', path: '/api/admin/countries' },
  { method: 'POST', path: '/api/admin/countries' },
  { method: 'PUT', path: '/api/admin/countries/:id' },
  { method: 'DELETE', path: '/api/admin/countries/:id' },
  { method: 'PATCH', path: '/api/admin/countries/:id/toggle' },
  { method: 'GET', path: '/api/admin/visa-types' },
  { method: 'POST', path: '/api/admin/visa-types' },
  { method: 'GET', path: '/api/admin/visa-types/:id' },
  { method: 'PUT', path: '/api/admin/visa-types/:id' },
  { method: 'DELETE', path: '/api/admin/visa-types/:id' },
  { method: 'PATCH', path: '/api/admin/visa-types/:id/toggle' },
  { method: 'PATCH', path: '/api/admin/visa-types/:id/corporate-price' },
  { method: 'GET', path: '/api/admin/applications' },
  { method: 'GET', path: '/api/admin/applications/:id' },
  { method: 'PUT', path: '/api/admin/applications/:id/status' },
  { method: 'PUT', path: '/api/admin/applications/:id/document-review' },
  { method: 'PUT', path: '/api/admin/applications/:id/approve-documents' },
  { method: 'POST', path: '/api/admin/applications/:id/visa-file' },
  { method: 'PUT', path: '/api/admin/applications/:id/manual-payment' },
  { method: 'GET', path: '/api/admin/applications/:id/documents/zip' },
  { method: 'GET', path: '/api/admin/payments' },
  { method: 'GET', path: '/api/admin/users' },
  { method: 'GET', path: '/api/admin/users/:userId/applications' },
  { method: 'GET', path: '/api/admin/users/:userId/vault' },
  { method: 'GET', path: '/api/admin/users/:userId/vault/zip' },
  { method: 'GET', path: '/api/admin/leads' },
  { method: 'PATCH', path: '/api/admin/leads/:id/read' },
  { method: 'DELETE', path: '/api/admin/leads/:id' },
  { method: 'GET', path: '/api/admin/notifications' },
  { method: 'PUT', path: '/api/admin/notifications/read-all' },
  { method: 'PUT', path: '/api/admin/notifications/:id/read' },
  { method: 'DELETE', path: '/api/admin/notifications/all' },
  { method: 'DELETE', path: '/api/admin/notifications/:id' },
];

router.get('/', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(generateDocsHTML('Pravasa Transworld API', routes));
});

export default router;
