// messageService.js
const Message = require('../models/messageEntity');
const BaseCrudService = require('./baseCrudService');

/**
 * MessageService class extends BaseCrudService for handling message-related operations.
 * Overrides the create and update methods to handle message-specific logic.
 */
class MessageService extends BaseCrudService {
    constructor(messageRepository, logger) {
        super('MessageService', messageRepository, logger);
    }

    /**
     * Creates a new message and saves it to the database using the repository.
     * @param {Object} data - The data for the new message.
     * @returns {Promise<newMessage>}
     */
    async create(data) {
        this.logger.info(`Service: ${this.serviceName} - create message`);
        const newMessage = new Message(data.content);
        return this.repository.create(newMessage);
    }
}

module.exports = MessageService;
