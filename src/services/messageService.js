const Message = require('../models/messageEntity');
const BaseCrudService = require('./baseCrudService');

class MessageService extends BaseCrudService {
    constructor(messageRepository, logger) {
        super('MessageService', messageRepository, logger);
    }

    async create(data) {
        this.logger.info(`Service: ${this.serviceName} - create message`);
        const newMessage = new Message(data.content);
        return this.repository.create(newMessage);
    }

    async update(id, data) {
        this.logger.info(
            `Service: ${this.serviceName} - updating message with id: ${id}`
        );
        return this.repository.update(id, data);
    }
}

module.exports = MessageService;
