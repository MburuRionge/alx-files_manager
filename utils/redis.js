import Redis from 'ioredis';

class RedisClient {
    constructor() {
        // initialize redis client
        this.client = new Redis();

        // handle redis client errors
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }

    /**
     * check if redis client is alive
     * @returns {boolean} True if Redis is connected, false otherwise
     */
    isAlive() {
        return this.client.status === 'ready';
    }

    /**
     * Get the value of a key from Redis
     * @param {string} key - The key to retrieve
     * @returns {Promise<string / null>} The value stored for the key, or null if the key does not exist
     */

    async get(key) {
        try {
            return await this.client.get(key);
        } catch (err) {
            console.error(`Error getting key ${key}:`, err);
            return null;
        }
    }

    /**
     * Set a avalue in Redid with an expiration time
     * @param {string} key - The key to set
     * @param {string} value - The value to store
     * @param {number} duration - Expiration time in seconds
     * @returns {Promise<void>}
     */
    async set(key, value, duration) {
        try {
            await this.client.set(key, value, 'EX', duration);
        } catch (err) {
            console.error(`Error setting key ${key}:`, err);
        }
    }

    /**
     * Delete a key from Redis
     * @param {string} key - The key to delete
     * @returns {pROMISE<VOID>}
     */
    async del(key) {
        try { 
            await this.client.del(key);
        } catch (err) {
            console.error(`Error deleting key ${key}:`, err);
        }
    }
}
// export a single instance  of RedisClient
const RedisClient = new RedisClient();
export default RedisClient;