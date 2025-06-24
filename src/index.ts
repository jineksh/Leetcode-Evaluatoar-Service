import express from 'express';
import config from './config/server'

const app = express();
const PORT = config.PORT;

app.listen(PORT, () => {
    console.log('Evaluator Service is running on port 3000');
    console.log("Watch")
})