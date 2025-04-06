const Container = require('kontainer-di');
const config = require('./config/config');
const Logger = require('./utils/logger');

const MongoDatabase = require('./models/mongoDatabase');
const InMemoryDatabase = require('./models/inMemoryDatabase');
const MessageMongoSchema = require('./models/messageMongoSchema');
const MessageInMemorySchema = require('./models/messageInMemorySchema');

const MessageRepository = require('./repositories/messageRepository');
const MessageService = require('./services/messageService');
const MessageController = require('./controllers/messageController');

// Register common dependencies for all environments
Container.register('config', [], config);
Container.register('logger', [], Logger);
Container.register('messageMongoSchema', ['logger'], MessageMongoSchema);
Container.register('messageInMemorySchema', ['logger'], MessageInMemorySchema);

// Register database dependencies based on the database setup
if (config.dbSetup === 'mongoDB') {
    Container.register('database', ['config', 'logger'], MongoDatabase);
    Container.register(
        'messageRepository',
        ['database', 'messageMongoSchema', 'logger'],
        MessageRepository
    );
} else {
    Container.register('database', ['config', 'logger'], InMemoryDatabase);
    Container.register(
        'messageRepository',
        ['database', 'messageInMemorySchema', 'logger'],
        MessageRepository
    );
}

// Register services
Container.register(
    'messageService',
    ['messageRepository', 'logger'],
    MessageService
);

// Register controllers
Container.register(
    'messageController',
    ['messageService', 'logger'],
    MessageController
);

// Export the container
module.exports = Container;
