import { Router } from 'express';
import {
  getBriefingLog,
  getFireBriefingLog,
  getPowerToolgLog,
  getSlingLog,
  updateFireBriefingLog,
  updatePowerToolLog,
  updateSlingLog,
  updateBriefingLog,
} from '../controllers/journalController.js';

const journalRouter = new Router();

journalRouter.get('/briefing-log', getBriefingLog);
journalRouter.get('/fire-briefing-log', getFireBriefingLog);
journalRouter.get('/power-tool-inspection-log', getPowerToolgLog);
journalRouter.get('/sling-inspection-log', getSlingLog);

journalRouter.patch('/briefing-log/update/:id', updateBriefingLog);
journalRouter.patch('/fire-briefing-log/update/:id', updateFireBriefingLog);
journalRouter.patch('/power-tool-inspection-log/:id', updatePowerToolLog);
journalRouter.patch('/sling-inspection-log/:id', updateSlingLog);

export default journalRouter;
