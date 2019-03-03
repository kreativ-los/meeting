import Participator from '../controllers/participatorController';

import {Router} from 'express';

const router = Router();

router.post('/:meeting/add', Participator.add);

export default router;
