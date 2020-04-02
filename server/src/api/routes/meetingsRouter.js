import Meetings from '../controllers/meetingsController';
import {Router} from 'express';

const router = Router();

router.post('/add', Meetings.add);
router.post('/has', Meetings.has);
router.get('/randomName', Meetings.randomName);

export default router;
