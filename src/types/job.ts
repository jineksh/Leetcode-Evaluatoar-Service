import { Job } from "bullmq";


export default interface IJOB {

    name : string;
    payload : any;
    handler : (job : Job) => void,
    failed : (job : Job) => void,

}