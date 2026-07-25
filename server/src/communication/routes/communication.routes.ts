import { Router } from 'express';
import * as communicationController from '../controller/communication.controller.js';
import validate from '../../middleware/validate.middleware.js';
import {
  publishEventSchema,
  replayEventsSchema,
} from '../validators/communication.validator.js';

const router = Router();

router.get('/events',         communicationController.getEvents);
router.get('/events/history', communicationController.getHistory);
router.get('/socket/status',  communicationController.getSocketStatus);
router.post('/events/replay', validate(replayEventsSchema), communicationController.replayEvents);
router.post('/events/test',   validate(publishEventSchema),  communicationController.testPublish);

export default router;
