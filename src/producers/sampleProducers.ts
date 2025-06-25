import sampleQueue from "../Queues/sampleQueue";

export default async function sampleProducer(name : string,payload : any,priority : number){
    try {
        console.log('inside sampleProducer');
        await sampleQueue.add(name, payload, {priority : priority});
        console.log('job added');
    } catch (error) {
        console.error('Error adding job to queue:', error);
    }
}