import { createClient } from 'redis';
import dotenv from "dotenv"

dotenv.config();

if (!process.env.REDIS_URL) {
    throw Error("REDIS_URL is missing in .env");
}

const redis = createClient({
    url: process.env.REDIS_URL,
});

redis.on('error', (err) => console.error('Redis Error:', err));
redis.on('connect', () => console.log('Redis connected successfully!'));

export const initRedis = async () => {
    await redis.connect();

    setInterval(() => {
        redis.ping().catch(() => {});
    }, 10000);
};

export default redis;
