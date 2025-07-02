import { Worker,Job } from 'bullmq'
import redisConnection from '../config/redisServer';
import submissionJob from '../jobs/submissionJob';

export default async function submissionWorker(name: string) {

    new Worker(name, async (job: Job) => {

        console.log('Inside the Worker function');

        if (job.name == 'submissonJob') {
            console.log(job.data);
            const submissionjob = new submissionJob(job.data);
            console.log(submissionjob);
            submissionjob.handler(job);
        }
        else {
            console.warn(`No handler defined for job: ${job.name}`);
        }
    },
        { connection: redisConnection }
    );

}