import express from 'express';
import config from './config/server'
import bodyParser from 'body-parser';
import { serverAdapter } from './bullborad/sampleBoard';
import apiRoutes from './routes/index';
import submissionWorker from './workers/submissionWorker';
//import submissionProducer from './producers/submissionProducers';

const server = async () => {


    const app = express();
    const PORT = config.PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use('/api', apiRoutes);
    app.use('/admin/queues', serverAdapter.getRouter());

    app.listen(PORT, async () => {
        console.log('Evaluator Service is running on port 3000');
        console.log(`BullBoard: http://localhost:${PORT}/admin/queues`);
        
        // const code = `
        //     #include <iostream>
        //     using namespace std;
        //     int main(){
        //         int x;
        //         cin>>x;
        //         int ans = 1;
        //         for(int i = 1; i<=x; i++){
        //             ans*=i;
        //         }
        //         cout<<ans;
        //     }
        // `
        submissionWorker('submissionQueue');
        // submissionProducer('submissonJob',{
        //     code : code,
        //     language : 'cpp',
        //     inputTestCase : '5',
        //     outputTestCase : '120'
        // })
    });
};

server();