import { Router } from 'express';
import { getBriefingLog } from '../controllers/journalController.js';

const journalRouter = new Router();

journalRouter.get('/briefing-log', getBriefingLog);

export default journalRouter;