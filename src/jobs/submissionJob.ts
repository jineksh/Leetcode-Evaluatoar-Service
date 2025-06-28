import { Job } from "bullmq";
import IJOB from "../types/job";
import { submissionPayload } from '../types/submission'
import executor from "../utils/executor";

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
            const response = await codeRunner?.execute(payload.code, payload.inputTestCase);
            console.log(response);
            return response;
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