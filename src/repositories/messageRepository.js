// messageRepository.js
const BaseRepository = require('./baseRepository');

/**
 * MessageRepository class extends BaseRepository for CRUD operations specific to messages.
 */
class MessageRepository extends BaseRepository {
    constructor(database, schema) {
        super(database, schema);
    }
}

module.exports = MessageRepository;
