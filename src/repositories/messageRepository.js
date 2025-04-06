// messageRepository.js
const BaseRepository = require('./baseRepository');

/**
 * MessageRepository class extends BaseRepository for CRUD operations specific to messages.
 */
class MessageRepository extends BaseRepository {
    constructor(database, schema, logger) {
        super('MessageRepository', database, schema, logger);
    }
}

module.exports = MessageRepository;
