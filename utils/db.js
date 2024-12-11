import { MongoClient } from 'mongodb';

// Configuration defaults and environment variables
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    const url = `mongodb://${DB_HOST}:${DB_PORT}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    this.database = null;

    // Connect to the MongoDB database
    this.client.connect()
      .then(() => {
        this.database = this.client.db(DB_DATABASE);
        console.log(`Connected to database: ${DB_DATABASE}`);
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
      });
  }

  /**
   * Check if MongoDB connection is alive
   * @returns {boolean} True if connected, false otherwise
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Get the number of documents in the 'users' collection
   * @returns {Promise<number>} Number of documents in 'users' collection
   */
  async nbUsers() {
    if (!this.database) return 0; // Return 0 if not connected
    const collection = this.database.collection('users');
    return collection.countDocuments();
  }

  /**
   * Get the number of documents in the 'files' collection
   * @returns {Promise<number>} Number of documents in 'files' collection
   */
  async nbFiles() {
    if (!this.database) return 0; // Return 0 if not connected
    const collection = this.database.collection('files');
    return collection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
