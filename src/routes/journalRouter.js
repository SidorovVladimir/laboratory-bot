import { Router } from 'express';
import { getBriefingLog, updateBriefingLog } from '../controllers/journalController.js';

const journalRouter = new Router();

journalRouter.get('/briefing-log', getBriefingLog);
journalRouter.patch('/briefing-log/update/:id', updateBriefingLog);


export default journalRouter;