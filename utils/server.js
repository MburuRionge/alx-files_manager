import express from 'express';
import routes from './routes/index.js';

const app = express();

// set the port from environment variable or use default 5000
const PORT = process.env.PORT || 5000;

// LOAD ALL ROUTES
app.use('/', routes);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});