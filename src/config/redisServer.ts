import Redis from 'ioredis';
import config from './server';


const redisConfig = {
    port : Number(config.REDIS_PORT),
    host : String(config.REDIS_HOST),
    maxRetriesPerRequest : null
};

const redisConnection = new Redis(redisConfig);

redisConnection.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redisConnection.on('error', (err) => {
  console.error('❌ Redis connection error:', err.message);
});


export default redisConnection;