import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

class AppController {
    /**
     * GET/status
     * Returns the status of Redis and Mongodb connetions
     */

    static async getStatus(req, res) {
        res.status(200).json({
            redis: redisClient.isAlive(),
            db: dbClient.isAlive(),
        });
    }

    /**
     * GET /stats
     * returns the number f users and files in the database
     */
    static async getStats(req, res) {
        const usersCount = await dbClient.nbUsers();
        const filescount  = await dbClient.nbFiles();

        res.status(200).json({
            users: usersCount,
            files: filescount,
    });
    }
}

export default AppController;