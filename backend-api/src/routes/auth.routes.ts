import { Router } from 'express';
import { sendOtp, sendLoginOtp, verifyOtp, adminLogin } from '../controllers/auth.controller';
import { otpRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/send-otp', otpRateLimiter, sendOtp);
router.post('/send-login-otp', otpRateLimiter, sendLoginOtp);
router.post('/verify-otp', otpRateLimiter, verifyOtp);
router.post('/admin/login', otpRateLimiter, adminLogin);

export default router;
