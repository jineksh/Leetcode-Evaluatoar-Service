import express from 'express';
import config from './config/server'
import bodyParser from 'body-parser';
import sampleWorker from './workers/sampleWorker';
import { serverAdapter } from './bullborad/sampleBoard';

const server = async () => {


    const app = express();
    const PORT = config.PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use('/admin/queues', serverAdapter.getRouter());


    app.listen(PORT,async() => {
        console.log('Evaluator Service is running on port 3000');
         console.log(`BullBoard: http://localhost:${PORT}/admin/queues`);
        await sampleWorker('sampleQueue');
    });
};

server();