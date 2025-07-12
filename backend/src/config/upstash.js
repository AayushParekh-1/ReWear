import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis'; 
import dotenv from 'dotenv';

dotenv.config();


// This is an exmaple of a rate limites that will allow only 100 request per minute.
    const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, '60s'),
});

export default ratelimit