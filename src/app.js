const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger');
const path = require('path');
const app = express();
const container = require('./container');
const httpStatusCode = require('http-status-codes');

const messageRoutes = require('./routes/messageRoutes');
const logger = container.get('logger');

// Enable helmet for security - helps secure Express apps by setting various HTTP headers
app.use(
    helmet({
        contentSecurityPolicy: false, // Add this to allow Swagger UI to work
    })
);
app.use(cors()); // Enable CORS for all routes - in order to allow cross-origin requests

// Enable JSON parsing for incoming requests
app.use(express.json());

// Enable URL-encoded data parsing
app.use(
    morgan('combined', {
        // Use combined format for logging
        stream: { write: message => logger.info(message.trim()) },
    })
);

// Add Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Defining a health check route
app.get('/health', (req, res) => {
    res.status(httpStatusCode.OK).json({ message: 'OK' });
});

// Defining a root route
app.get('/', (req, res) => {
    res.status(httpStatusCode.OK).sendFile(path.join(__dirname, './root.html'));
});

// API routes
app.use('/api/v1/messages', messageRoutes);

// Defining a 404 error handler for unknown routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Resource not found',
    });
});

module.exports = app;
