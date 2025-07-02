import responseQueue from "../Queues/responseQueue";

export default async function responseProducer(payload : any){
    try {
        console.log('inside responseProducer');
        await responseQueue.add('responseJob', payload);
        console.log('job added');
    } catch (error) {
        console.error('Error adding job to queue:', error);
    }
}