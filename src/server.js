// server.js

const app = require('./app');
const container = require('./container');

const logger = container.get('logger');
const config = container.get('config');
const database = container.get('database');

// Connect to database and start the server
(async () => {
    try {
        await database.connect();

        const server = app.listen(config.port, () => {
            logger.info(
                `Server is running in mode ${config.env} on port ${config.port}`
            );
            logger.info(`Root url is available at ${config.root}`);
            logger.info(
                `Swagger documentation is available at ${config.root}/api-docs`
            );
        });

        // Handle unexpected exceptions
        process.on('uncaughtException', err => {
            logger.error('Uncaught Exception!!! Server is going down');
            logger.error(err.name, err.message);
            server.close(async () => {
                await database.disconnect();
                process.exit(1);
            });
        });

        // Handle unhandled rejections
        process.on('unhandledRejection', err => {
            logger.error('Unhandled Rejection!!! Shutting down...');
            logger.error(err.name, err.message);
            server.close(async () => {
                await database.disconnect();
                process.exit(1);
            });
        });

        // Handle SIGTERM signal
        process.on('SIGTERM', () => {
            logger.info('SIGTERM signal received: closing HTTP server');
            server.close(async () => {
                await database.disconnect();
                logger.info('HTTP server closed, Server terminated...');
            });
        });
    } catch (err) {}
})();
