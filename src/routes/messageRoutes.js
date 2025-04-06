// messageRoutes.js

const express = require('express');
const router = express.Router();
const container = require('../container');
const controller = container.get('messageController');
const validateMessage = require('../middlewares/validateMessage');

/**
 * Message routes for handling CRUD operations.
 * Defining all RESTful routes for messages management.
 */

// Get all messages
router.get('/', controller.getAll);

// Get a message by ID
router.get('/:id', controller.getOne);

// Create a new message
router.post('/', validateMessage, controller.create);

// Update a message by ID
router.put('/:id', validateMessage, controller.update);

// Delete a message by ID
router.delete('/:id', controller.delete);

module.exports = router;
