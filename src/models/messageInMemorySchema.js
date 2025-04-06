// messageInMemorySchema.js
const BaseSchema = require('../interfaces/baseSchema');

/**
 * MessageInMemorySchema class extends the BaseSchema to handle CRUD operations for InMemory Database.
 * Used as the schema for InMemory database, mimicking the behavior of a real database.
 */
class MessageInMemorySchema extends BaseSchema {
    constructor(logger) {
        super('Message InMemory Schema', logger);
        this.messages = [];
    }

    /**
     * Creates a new message in the InMemory database.
     * @param {Object} data - The message data to be created
     * @returns {Promise<{Object}>} - The created message object
     */
    async create(data) {
        this.logger.info(`${this.schemaName}: Creating new message`);
        const message = {
            id: data.id,
            content: data.content,
            isPalindrome: require('../utils/palindromeChecker')(data.content),
            creationTime: new Date(),
            lastUpdatedTime: new Date(),
        };
        this.messages.push(message);
        this.logger.info(
            `${this.schemaName}: Message ${message.content} created with id: ${message.id} successfully`
        );
        return message;
    }

    /**
     * Finds a message by ID in the InMemory database.
     * @param {Object} id - The ID of the message to be found
     * @returns {Promise<*>} - The found message object or null if not found
     */
    async getById(id) {
        this.logger.info(`${this.schemaName}: Finding message with id: ${id}`);
        const message = this.messages.find(message => message.id === id);
        if (!message) {
            this.logger.error(
                `${this.schemaName}: Message with id: ${id} not found`
            );
            return null;
        }
        this.logger.info(
            `${this.schemaName}: Message with id: ${id} found successfully`
        );
        return message;
    }

    /**
     * Retrieves all messages from the InMemory database.
     * @returns {Promise<Object[]>} - An array of all message objects
     */
    async getAll() {
        this.logger.info(`${this.schemaName}: Finding all messages`);
        if (this.messages.length === 0) {
            this.logger.error(`${this.schemaName}: No messages found`);
            return [];
        }
        this.logger.info(`${this.schemaName}: Messages found successfully`);
        return this.messages;
    }

    /**
     * Updates a message by ID in the InMemory database.
     * @param {String} id - The ID of the message to be updated
     * @param {Object} data - The new data to update the message with
     * @returns {Promise<*|null>} - The updated message object or null if not found
     */
    async update(id, data) {
        this.logger.info(
            `${this.schemaName}: Updating message with id: ${id} to ${data.content}`
        );
        const messageIndex = this.messages.findIndex(
            message => message.id === id
        );
        if (messageIndex === -1) {
            this.logger.error(
                `${this.schemaName}: Message with id: ${id} not found`
            );
            return null;
        }
        this.logger.info(
            `${this.schemaName}: Message with id: ${id} found and updated successfully to ${data.content}`
        );
        this.messages[messageIndex].content = data.content;
        this.messages[messageIndex].isPalindrome =
            require('../utils/palindromeChecker')(data.content);
        this.messages[messageIndex].lastUpdatedTime = new Date();
        return this.messages[messageIndex];
    }

    /**
     * Deletes a message by ID from the InMemory database.
     * @param {String} id - The ID of the message to be deleted
     * @returns {Promise<*|null>} - The deleted message object or null if not found
     */
    async delete(id) {
        this.logger.info(`${this.schemaName}: Deleting message with id: ${id}`);
        const index = this.messages.findIndex(message => message.id === id);
        if (index === -1) {
            this.logger.error(
                `${this.schemaName}: Message with id: ${id} not found`
            );
            return null;
        }
        this.logger.info(
            `${this.schemaName}: Message with id: ${id} found and deleted successfully`
        );
        return this.messages.splice(index, 1)[0];
    }
}

module.exports = MessageInMemorySchema;
