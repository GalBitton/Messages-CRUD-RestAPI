const BaseRepository = require('./baseRepository');

class MessageRepository extends BaseRepository {
    constructor(database, schema) {
        super(database, schema);
    }
}

module.exports = MessageRepository;
