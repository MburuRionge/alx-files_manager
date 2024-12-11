class RedisClient {
    constructor() {
        const Redis = require('ioredis');
        this.client = new Redis();

        // Handle Redis connection errors
        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
        })
    }

    /**
     * check if redis connection is alive
     * @returns {boolean} True if redis is connected, if else false
     */
    isAlive() {
        return this.client.status === 'ready';
    }
}

const redisClient = new RedisClient();
console.log('isAlive:', redisClient.isAlive());
