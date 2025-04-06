// messageInMemorySchema.js
const BaseSchema = require('../interfaces/baseSchema');

/**
 * MessageInMemorySchema class extends the BaseSchema to handle CRUD operations for InMemory Database.
 * Used as the schema for InMemory database, mimicking the behavior of a real database.
 */
class MessageInMemorySchema extends BaseSchema {
    constructor() {
        super('Message InMemory Schema');
        this.messages = [];
    }

    /**
     * Creates a new message in the InMemory database.
     * @param {Object} data - The message data to be created
     * @returns {Promise<{Object}>} - The created message object
     */
    async create(data) {
        const message = {
            id: data.id,
            content: data.content,
            isPalindrome: require('../utils/palindromeChecker')(data.content),
            creationTime: new Date(),
            lastUpdatedTime: new Date(),
        };
        this.messages.push(message);
        return message;
    }

    /**
     * Finds a message by ID in the InMemory database.
     * @param {Object} id - The ID of the message to be found
     * @returns {Promise<*>} - The found message object or null if not found
     */
    async getById(id) {
        return this.messages.find(message => message.id === id);
    }

    /**
     * Retrieves all messages from the InMemory database.
     * @returns {Promise<Object[]>} - An array of all message objects
     */
    async getAll() {
        return this.messages;
    }

    /**
     * Updates a message by ID in the InMemory database.
     * @param {String} id - The ID of the message to be updated
     * @param {Object} data - The new data to update the message with
     * @returns {Promise<*|null>} - The updated message object or null if not found
     */
    async update(id, data) {
        const messageIndex = this.messages.findIndex(
            message => message.id === id
        );
        if (messageIndex === -1) {
            return null;
        }
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
        const index = this.messages.findIndex(message => message.id === id);
        if (index === -1) {
            return null;
        }
        return this.messages.splice(index, 1)[0];
    }
}

module.exports = MessageInMemorySchema;
