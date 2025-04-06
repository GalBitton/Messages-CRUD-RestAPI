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
                `Server: Server is running in mode ${config.env} on port ${config.port}`
            );
            logger.info(`Server: Root url is available at ${config.root}`);
            logger.info(
                `Server: Swagger documentation is available at ${config.root}/api-docs`
            );
        });

        // Handle unexpected exceptions
        process.on('uncaughtException', err => {
            logger.error('Server: Uncaught Exception!!! Server is going down');
            logger.error(err.name, err.message);
            server.close(async () => {
                await database.disconnect();
                process.exit(1);
            });
        });

        // Handle unhandled rejections
        process.on('unhandledRejection', err => {
            logger.error('Server: Unhandled Rejection!!! Shutting down...');
            logger.error(err.name, err.message);
            server.close(async () => {
                await database.disconnect();
                process.exit(1);
            });
        });

        // Handle SIGTERM signal
        process.on('SIGTERM', () => {
            logger.info('Server: SIGTERM signal received: closing HTTP server');
            server.close(async () => {
                await database.disconnect();
                logger.info('HTTP server closed, Server terminated...');
            });
        });
    } catch (err) {}
})();
