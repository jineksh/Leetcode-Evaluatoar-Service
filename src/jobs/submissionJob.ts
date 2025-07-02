import { Job } from "bullmq";
import IJOB from "../types/job";
import { submissionPayload } from '../types/submission'
import executor from "../utils/executor";
import responseProducer from "../producers/responseProducers";

class submissionJob implements IJOB {

    name: string;
    payload: Record<string, submissionPayload>;

    constructor(payload: Record<string, submissionPayload>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    async handler(job: Job) {
        const payload = job.data as submissionPayload;
        try {
            const codeRunner = executor(payload.language);
            const response = await codeRunner?.execute(payload.code, payload.inputTestCase, job.data.outputTestCase);
            console.log(response);
            const responsePayload = {
                response,
                submissonId : job.data.submissonId
            }
            responseProducer(responsePayload);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    failed(job: Job): void {
        console.log('Inside SampleJob failed handler');
        console.error('Job failed:', job.id);
    }

}

export default submissionJob;