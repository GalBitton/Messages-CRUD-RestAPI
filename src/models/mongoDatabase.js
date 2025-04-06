// mongoDatabase.js
const BaseDatabase = require('../interfaces/baseDatabase');
const mongoose = require('mongoose');

/**
 * MongoDatabase class extends the BaseDatabase to handle CRUD operations for MongoDB.
 * Wrapper class for Mongoose, providing a consistent interface for database operations.
 */
class MongoDatabase extends BaseDatabase {
    constructor(config, logger) {
        super('MongoDatabase', config, logger);
    }

    /**
     * Connect to the MongoDB database.
     */
    async connect() {
        try {
            this.logger.info(`${this.dbName}: Connecting to database ...`);
            await mongoose.connect(
                this.config.mongodb.uri,
                this.config.mongodb.options
            );
            this.logger.info(
                `${this.dbName}: Connected successfully to: ${mongoose.connection.host}`
            );
        } catch (err) {
            this.logger.error(
                `${this.dbName}: Error connecting to database: ${err.message}`
            );
            throw new Error(
                `${this.dbName}: Error connecting to database: ${err.message}`
            );
        }
    }

    /**
     * Disconnect from the MongoDB database.
     */
    async disconnect() {
        try {
            this.logger.info(`${this.dbName}: Disconnecting from database ...`);
            await mongoose.connection.close();
            this.logger.info(`${this.dbName}: Disconnected from database`);
        } catch (err) {
            this.logger.error(
                `${this.dbName}: Error disconnecting from database: ${err.message}`
            );
            throw new Error(
                `${this.dbName}: Error disconnecting from database: ${err.message}`
            );
        }
    }

    /**
     * Create a new document in the MongoDB database.
     * @param {Object} data - The data to be created in the database
     * @param {Object} schema - The schema to be used for creating the data
     * @returns {Promise<*>} - The created document
     */
    async create(data, schema) {
        try {
            this.logger.info(
                `${this.dbName}: Creating document in ${schema.schemaName}`
            );
            const document = await schema.create(data);
            this.logger.info(
                `${this.dbName}: Document created with id: ${document.id} and content: ${document.content}`
            );
            return document;
        } catch (err) {
            this.logger.error(
                `${this.dbName}: Error creating document: ${err.message}`
            );
            throw new Error(
                `${this.dbName}: Error creating document: ${err.message}`
            );
        }
    }

    /**
     * Find a document by ID in the MongoDB database.
     * @param {String} id - The ID of the document to be found
     * @param {Object} schema - The schema to be used for finding the data
     * @returns {Promise<Object|*>} - The found document or null if not found
     */
    async findById(id, schema) {
        try {
            this.logger.info(`${this.dbName}: Finding document by id: ${id}`);
            const document = await schema.getById(id);
            if (!document) {
                throw new Error(
                    `${this.dbName}: Document not found with id: ${id}`
                );
            }
            this.logger.info(
                `${this.dbName}: Document with id ${document.id} and content ${document.content} found`
            );
            return document;
        } catch (err) {
            this.logger.error(
                `${this.dbName}: Error finding document by id: ${err.message}`
            );
            throw new Error(
                `${this.dbName}: Error finding document by id: ${err.message}`
            );
        }
    }

    /**
     * Find all documents in the MongoDB database.
     * @param {Object} schema - The schema to be used for finding the data
     * @returns {Promise<*>} - The found documents
     */
    async findAll(schema) {
        try {
            this.logger.info(
                `${this.dbName}: Finding all documents in ${schema.schemaName}`
            );
            const documents = await schema.getAll();
            this.logger.info(`${this.dbName}: Documents found`);
            return documents;
        } catch (err) {
            this.logger.error(
                `${this.dbName}: Error finding all documents: ${err.message}`
            );
            throw new Error(
                `${this.dbName}: Error finding all documents: ${err.message}`
            );
        }
    }

    /**
     * Update a document in the MongoDB database.
     * @param {String} id - The ID of the document to be updated
     * @param {Object} data - The data to be updated
     * @param {Object} schema - The schema to be used for updating the data
     * @returns {Promise<*>} - The updated document
     */
    async update(id, data, schema) {
        try {
            this.logger.info(
                `${this.dbName}: Updating document with id: ${id} to ${data.content}`
            );
            const document = await schema.update(id, data, {
                new: true,
                runValidators: true,
            });
            if (!document) {
                this.logger.error(
                    `${this.dbName}: Document with id ${id} not found`
                );
                throw new Error(
                    `${this.dbName}: Document not found with id: ${id}`
                );
            }
            this.logger.info(
                `${this.dbName}: Document with id ${document.id} content updated to: ${document.content}`
            );
            return document;
        } catch (err) {
            this.logger.error(
                `${this.dbName}: Error updating document: ${err.message}`
            );
            throw new Error(
                `${this.dbName}: Error updating document: ${err.message}`
            );
        }
    }

    /**
     * Delete a document in the MongoDB database.
     * @param {String} id - The ID of the document to be deleted
     * @param {Object} schema - The schema to be used for deleting the data
     * @returns {Promise<*>} - The deleted document
     */
    async delete(id, schema) {
        try {
            this.logger.info(
                `${this.dbName}: Deleting document with id: ${id}`
            );
            const document = await schema.delete(id);
            if (!document) {
                throw new Error(
                    `${this.dbName}: Document not found with id: ${id}`
                );
            }
            this.logger.info(
                `${this.dbName}: Document with content ${document.content} deleted`
            );
            return document;
        } catch (err) {
            this.logger.error(
                `${this.dbName}: Error deleting document: ${err.message}`
            );
            throw new Error(
                `${this.dbName}: Error deleting document: ${err.message}`
            );
        }
    }
}

module.exports = MongoDatabase;
