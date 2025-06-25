import { Job } from "bullmq";
import IJOB from "../types/job";

class SampleJob implements IJOB {

    name: string;
    payload: any;

    constructor(payload: any) {
        this.name = this.constructor.name;
        this.payload = payload;
    }


    handler(job: Job): void {
        console.log('Inside SampleJob handler');

        if (job) {
            console.log(this.payload);
            console.log('Job ID:', job.id);
            console.log('Job Name:', job.name);
            console.log('Job Data:', job.data);
        } else {
            console.error('Job is undefined');
        }
    };

    failed(job: Job): void {
        console.log('Inside SampleJob failed handler');
        console.error('Job failed:', job.id);
    }

}

export default SampleJob;