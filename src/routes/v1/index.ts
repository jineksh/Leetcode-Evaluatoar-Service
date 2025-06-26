import express from 'express'
import submissionRouter from './submisson'


const router = express.Router();

router.use('/submission',submissionRouter)

export default router;