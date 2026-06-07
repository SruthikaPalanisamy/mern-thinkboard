import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();
// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv() , // uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from environment variables  
    limiter: Ratelimit.slidingWindow( 5, "10 s"), // 10 requests per 20 seconds
});

export default ratelimit;