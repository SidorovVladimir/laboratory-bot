import { Router } from 'express';
import journalRouter from './journalRouter.js';
const router = new Router();

router.use('/journals', journalRouter);

export default router;