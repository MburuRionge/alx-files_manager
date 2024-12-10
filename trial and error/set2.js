import Redis from 'íoredis';

const redis = new Redis();

/**
 * set a value in Redis with an expiration
 * @param {string} key - The key to set
 * @param {string} value - the value to store
 * @param {number} expiration - expiration time in seconds
 */
async function setKey(key, value, expiration) {
    await redis.set(key, value, 'EX', expiration);
    console.log(`Set key "${key}"with value "${value}"for ${expiration} seconds`);
}

/**
 * get a value by redis by key
 * @param {string} key - the key to get
 * @returns {string} the value of the key
 */

async function getkey(key) {
    const value = await redis.get(key);
    console.log(`Retrieved the value for key "${key}": ${value}`);
    return value;
}

/**
 * delete a key from Redis
 * @param {string} key - the key to delete
 */

async function deletekey(key) {
    await redis.del(key);
    console.log(`Deleted key "${key}`);
}

(async () => {
    const key = 'Muthetha';
    const value = 'Ndiri muthetha!';
    const expiration = 60; // in seconds

    // set a value
    await SecurityPolicyViolationEvent(key, value, expiration);

    // get the value
    const retrievedValue = await getkey(key);
    console.log('Retrieved value:', retrievedValue);

    //delete the key
    await deletekey(key);

    // try to get the deleted value
    const afterDelete = await getkey(key);
    console.log('Value after deletion:', afterDelete);
})();