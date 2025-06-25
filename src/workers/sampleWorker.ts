import { Worker,Job } from 'bullmq'
import redisConnection from '../config/redisServer';
import sampleJob from '../jobs/sampleJob';

export default async function sampleWorker(name: string) {

    new Worker(name, async (job: Job) => {

        console.log('Inside the Worker function');

        if (job.name == 'sampleJob') {

            const samplejob = new sampleJob(job.data);

            samplejob.handler(job);

        }
        else {
            console.warn(`No handler defined for job: ${job.name}`);
        }

    },
        { connection: redisConnection }
    );

}