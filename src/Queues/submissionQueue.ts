import { Queue } from 'bullmq';
import  redisConnection  from '../config/redisServer';

export default new Queue('submissionQueue',{connection: redisConnection});