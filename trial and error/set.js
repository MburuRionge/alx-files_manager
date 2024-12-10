import Redis from 'ioredis';

const redis = new Redis();

(async () => {
    try {
        const key = 'mburu';
        const value  = 'Hello, Redis!';
        const expiration = 30; // in seconds

        // set a key-value pair with expiration
        await redis.set(key, value, 'EX', expiration);
        console.log(`Set key "${key}" with value "${value}" for ${expiration} seconds`);

        //Get the value of the key
        const storedValue = await redis.get(key);
        console.log(`Retrieved value for key "${key}": ${storedValue}`);

        // delete the key
        await redis.del(key);
        console.log(`Deleted key "${key}"`);

        // Attempt to retrieve the deleted key
        const deletedValue = await redis.get(key);
        console.log(`Value after deletion for key "${key}": ${deletedValue}`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        redis.disconnect()
    }
})();