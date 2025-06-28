import submissionQueue from '../Queues/submissionQueue'

export default async function submissionProducer(name : string,payload : any){
    try {
        console.log('inside submissionProducer');
        await submissionQueue.add(name, payload);
        console.log('job added');
    } catch (error) {
        console.error('Error adding job to queue:', error);
    }
}