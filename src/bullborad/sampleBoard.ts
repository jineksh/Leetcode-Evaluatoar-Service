// import { ExpressAdapter } from '@bull-board/express';
// import {BullMQAdapter} from "@bull-board/api/bullMQAdapter";
// import { createBullBoard, } from '@bull-board/api';
// import sampleQueue from '../Queues/sampleQueue';



// const serverAdapter = new ExpressAdapter();
// serverAdapter.setBasePath('/admin/queues');

// createBullBoard({
//     queues: [new BullMQAdapter(sampleQueue)],
//     serverAdapter,
// });

// export { serverAdapter };
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/dist/src/queueAdapters/bullMQ';
import { createBullBoard } from '@bull-board/api';
import sampleQueue from '../Queues/sampleQueue';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
    queues: [new BullMQAdapter(sampleQueue as any) as any],
    serverAdapter : serverAdapter,
});

export { serverAdapter };