import express from 'express';
import { logUserAccess, getUserAccessLogs } from '../controllers/logController.js';

const router = express.Router();

router.post('/access', logUserAccess);
router.get('/access', getUserAccessLogs);

export default router;