import { Router } from 'express';
import { getPublicCountries, getPublicVisaTypes } from '../controllers/user/applications.controller';

const router = Router();

router.get('/countries', getPublicCountries as any);
router.get('/visa-types', getPublicVisaTypes as any);

export default router;
