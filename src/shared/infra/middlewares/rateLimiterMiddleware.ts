import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import cacheConfig from '@config/cache';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 5, // 10 requests
    duration: 1, // per 1 second by IP
});

export default async function rateLimiterMiddleware(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await rateLimiter.consume(request.ip);
        return next();
    } catch {
        throw new AppError('Too Many Requests', 429);
    }
}
