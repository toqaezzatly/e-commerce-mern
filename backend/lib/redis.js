// config/redis.config.js
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Create and configure the Redis client
const redis = new Redis(process.env.UPSTASH_REDIS_URL);

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export {redis};

 

