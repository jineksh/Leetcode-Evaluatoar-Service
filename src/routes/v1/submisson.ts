import express from 'express'
import { createSubmisson } from '../../dtos/submissonDto';
import { submissionValidator } from '../../validators/submissonValidator';

import { createSubmissonController } from '../../controller/submission';

const router = express.Router();

router.post('/',submissionValidator(createSubmisson),createSubmissonController)

export default router;