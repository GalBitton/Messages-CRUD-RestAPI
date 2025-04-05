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

// Security middleware
app.use(
    helmet({
        contentSecurityPolicy: false, // Add this to allow Swagger UI to work
    })
);
app.use(cors());

// Request parsing
app.use(express.json());

// Logging
app.use(
    morgan('combined', {
        stream: { write: message => logger.info(message.trim()) },
    })
);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get('/health', (req, res) => {
    res.status(httpStatusCode.OK).json({ message: 'OK' });
});

// Defining a root route
app.get('/', (req, res) => {
    res.status(httpStatusCode.OK).sendFile(
        path.join(__dirname, './root-page/root.html')
    );
});

// API routes
app.use('/api/v1/messages', messageRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Resource not found',
    });
});

module.exports = app;
