import { Redis } from '@upstash/redis';
import dotenv from "dotenv";

dotenv.config();

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Missing Upstash Redis configuration in .env");
}

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

(async () => {
    try {
        await redis.ping();
        console.log("✅ Upstash Redis connected successfully!");
    } catch (err) {
        console.error("❌ Failed to connect to Upstash Redis:", err);
    }
})();