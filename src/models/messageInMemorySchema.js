const BaseSchema = require('../interfaces/baseSchema');

class MessageInMemorySchema extends BaseSchema {
    constructor() {
        super('Message InMemory Schema');
        this.messages = [];
    }

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

    async getById(id) {
        return this.messages.find(message => message.id === id);
    }

    async getAll() {
        return this.messages;
    }

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

    async delete(id) {
        const index = this.messages.findIndex(message => message.id === id);
        if (index === -1) {
            return null;
        }
        return this.messages.splice(index, 1)[0];
    }
}

module.exports = MessageInMemorySchema;
