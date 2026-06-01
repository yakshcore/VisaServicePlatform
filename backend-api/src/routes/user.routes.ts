import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';
import * as apps from '../controllers/user/applications.controller';
import * as notifs from '../controllers/user/notifications.controller';

const router = Router();
router.use(protect);

// Dashboard
router.get('/dashboard', apps.getDashboard);

// Applications
router.get('/applications', apps.getApplications);
router.post('/applications', apps.createApplication);
router.get('/applications/:id', apps.getApplication);
router.post('/applications/:id/documents', upload.single('file'), apps.uploadDocument);
router.put('/applications/:id/payment', apps.makePayment);

// Notifications
router.get('/notifications', notifs.getNotifications);
router.put('/notifications/:id/read', notifs.markAsRead);
router.put('/notifications/read-all', notifs.markAllRead);

export default router;
