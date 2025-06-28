import { Worker,Job } from 'bullmq'
import redisConnection from '../config/redisServer';
import submissionJob from '../jobs/submissionJob';

export default async function submissionWorker(name: string) {

    new Worker(name, async (job: Job) => {

        console.log('Inside the Worker function');

        if (job.name == 'submissionJob') {
            const submissionjob = new submissionJob(job.data);
            submissionjob.handler(job);
        }
        else {
            console.warn(`No handler defined for job: ${job.name}`);
        }
    },
        { connection: redisConnection }
    );

}