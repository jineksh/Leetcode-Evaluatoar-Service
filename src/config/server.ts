import dotenv from 'dotenv';


dotenv.config();

export default {
    PORT : process.env.PORT || 3000,
    REDIS_PORT : process.env.REDIS_PORT || 6379,
    REDIS_HOST : process.env.REDIS_HOST || 'localhost',
}