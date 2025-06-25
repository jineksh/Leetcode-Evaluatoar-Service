import express from 'express';
import config from './config/server'
import sampleProducer from './producers/sampleProducers';
import bodyParser from 'body-parser';
import sampleWorker from './workers/sampleWorker';

const server = async () => {


    const app = express();
    const PORT = config.PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());


    app.listen(PORT,async() => {
        console.log('Evaluator Service is running on port 3000');
        await sampleProducer('sampleJob', {
            name: 'sampleJob',
            work: 'Your task is only sample test'
        },2);
        await sampleProducer('sampleJob', {
            name: 'sampleJob',
            work: 'Your task is only sample test 2'
        },1);
        await sampleWorker('sampleQueue');
    });
};

server();