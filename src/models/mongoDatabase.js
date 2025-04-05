const BaseDatabase = require('../interfaces/baseDatabase');
const mongoose = require('mongoose');

class MongoDatabase extends BaseDatabase {
    constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
    }

    async connect() {
        try {
            this.logger.info('Connecting to MongoDB...');
            await mongoose.connect(
                this.config.mongodb.uri,
                this.config.mongodb.options
            );
            this.logger.info(
                `Connected to MongoDB: ${mongoose.connection.host}`
            );
        } catch (err) {
            this.logger.error(`Error connecting to MongoDB: ${err.message}`);
            throw new Error(`Error connecting to MongoDB: ${err.message}`);
        }
    }

    async disconnect() {
        try {
            this.logger.info('Disconnecting from MongoDB...');
            await mongoose.connection.close();
            this.logger.info('Disconnected from MongoDB');
        } catch (err) {
            this.logger.error(
                `Error disconnecting from MongoDB: ${err.message}`
            );
            throw new Error(`Error disconnecting from MongoDB: ${err.message}`);
        }
    }

    async create(data, schema) {
        try {
            this.logger.info(`Creating document in ${schema.schemaName}`);
            const document = await schema.create(data);
            this.logger.info(`Document created: ${document}`);
            return document;
        } catch (err) {
            this.logger.error(`Error creating document: ${err.message}`);
            throw new Error(`Error creating document: ${err.message}`);
        }
    }

    async findById(id, schema) {
        try {
            this.logger.info(`Finding document by id: ${id}`);
            const document = await schema.getById(id);
            if (!document) {
                throw new Error(`Document not found with id: ${id}`);
            }
            this.logger.info(
                `Document with id ${document.id} and content ${document.content} found`
            );
            return document;
        } catch (err) {
            this.logger.error(`Error finding document by id: ${err.message}`);
            throw new Error(`Error finding document by id: ${err.message}`);
        }
    }

    async findAll(schema) {
        try {
            this.logger.info(`Finding all documents in ${schema.schemaName}`);
            const documents = await schema.getAll();
            this.logger.info(`Documents found`);
            return documents;
        } catch (err) {
            this.logger.error(`Error finding all documents: ${err.message}`);
            throw new Error(`Error finding all documents: ${err.message}`);
        }
    }

    async update(id, data, schema) {
        try {
            this.logger.info(`Updating document with id: ${id}`);
            const document = await schema.update(id, data, {
                new: true,
                runValidators: true,
            });
            if (!document) {
                throw new Error(`Document not found with id: ${id}`);
            }
            this.logger.info(
                `Document with id ${document.id} content updated to: ${document.content}`
            );
            return document;
        } catch (err) {
            this.logger.error(`Error updating document: ${err.message}`);
            throw new Error(`Error updating document: ${err.message}`);
        }
    }

    async delete(id, schema) {
        try {
            this.logger.info(`Deleting document with id: ${id}`);
            const document = await schema.delete(id);
            if (!document) {
                throw new Error(`Document not found with id: ${id}`);
            }
            this.logger.info(
                `Document with content ${document.content} deleted`
            );
            return document;
        } catch (err) {
            this.logger.error(`Error deleting document: ${err.message}`);
            throw new Error(`Error deleting document: ${err.message}`);
        }
    }
}

module.exports = MongoDatabase;
