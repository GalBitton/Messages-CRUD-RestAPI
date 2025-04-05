const BaseDatabase = require('../interfaces/baseDatabase');

class InMemoryDatabase extends BaseDatabase {
    constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
    }

    async connect() {
        this.logger.info('InMemoryDatabase connected');
    }

    async disconnect() {
        this.logger.info('InMemoryDatabase disconnected');
    }

    async create(data, schema) {
        this.logger.info('Creating new record in InMemoryDatabase');
        const document = await schema.create(data);
        this.logger.info(`Record created: ${JSON.stringify(document)}`);
        return document;
    }

    async findById(id, schema) {
        this.logger.info(`Finding record with ID: ${id}`);
        const document = await schema.getById(id);
        if (!document) {
            this.logger.error(`Record with ID: ${id} not found`);
            return null;
        }
        this.logger.info(`Record found: ${JSON.stringify(document)}`);
        return document;
    }

    async findAll(schema) {
        this.logger.info(`Finding all records in InMemoryDatabase`);
        const documents = await schema.getAll();
        return documents;
    }

    async update(id, data, schema) {
        this.logger.info(`Updating record with ID: ${id}`);
        const document = await schema.update(id, data);
        if (!document) {
            this.logger.error(`Record with ID: ${id} not found`);
            return null;
        }
        this.logger.info(`Record updated: ${JSON.stringify(document)}`);
        return document;
    }
    async delete(id, schema) {
        this.logger.info(`Deleting record with ID: ${id}`);
        const document = await schema.delete(id);
        if (!document) {
            this.logger.error(`Record with ID: ${id} not found`);
            return null;
        }
        this.logger.info(`Record deleted: ${JSON.stringify(document)}`);
        return document;
    }
}

module.exports = InMemoryDatabase;
