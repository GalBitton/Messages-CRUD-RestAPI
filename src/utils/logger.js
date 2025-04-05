const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');

const transports = new winston.transports.DailyRotateFile({
    filename: path.join(logDirectory, 'messages-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // If you want to compress the log files
    maxSize: '1m', // Maximum size of a log file
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(
            info =>
                `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`
        )
    ),
    transports: [
        ...(process.env.LOG_CONSOLE === 'true'
            ? [new winston.transports.Console()]
            : []),
        ...(process.env.LOG_FILE === 'true' ? [transports] : []),
    ],
});

module.exports = logger;
