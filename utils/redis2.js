import Redis from 'ioredis';

const redis = new Redis();

(async () => {
    // set a value with an expiration time
    await redis.set('key', 'value', 'EX', 10);

    // Get the value of a key
    const value = await redis.get('key');
    console.log('Value:', value);

    //Delete the key
    await redis.del('key');

    // check if the key exists
    const exists = await redis.exists('key');
    console.log('Exists:', exists);
})();