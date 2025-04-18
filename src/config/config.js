// config.js

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

/**
 * Configuration file for the application.
 * Load environment variables from a .env file and sets default values as needed.
 */
const config = {
    env: process.env.NODE_ENV || 'development',
    dbSetup: process.env.DB_SETUP || 'inMemory',
    port: process.env.PORT || 8080,
    root:
        process.env.ROOT_URL || `http://localhost:${process.env.PORT || 8080}`,
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',
        options: {
            dbName: process.env.MONGODB_COLLECTION || 'mycollection',
        },
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_CONSOLE === 'true',
        file: process.env.LOG_FILE === 'true',
        filepath: process.env.LOG_FILE_PATH || '../logs/app.log',
    },
};

module.exports = config;
