// inMemoryDatabase.js

const BaseDatabase = require('../interfaces/baseDatabase');

/**
 * InMemoryDatabase class
 * This class implements the BaseDatabase interface for in-memory data storage.
 */
class InMemoryDatabase extends BaseDatabase {
    constructor(config, logger) {
        super('InMemoryDatabase', config, logger);
    }

    /**
     * Connect to the in-memory database.
     * @returns {Promise<void>}
     */
    async connect() {
        this.logger.info(`${this.dbName}: connected`);
    }

    /**
     * Disconnect from the in-memory database.
     * @returns {Promise<void>}
     */
    async disconnect() {
        this.logger.info(`${this.dbName}: disconnected`);
    }

    /**
     * Create a new record in the in-memory database.
     * @param {Object} data - The data to be created in the database
     * @param {Object} schema - The schema to be used for creating the data
     * @returns {Promise<*>} - The created document
     */
    async create(data, schema) {
        this.logger.info(
            `${this.dbName}: Creating new record with content: ${data.content}`
        );
        const document = await schema.create(data);
        this.logger.info(
            `${this.dbName}: Record created successfully with ID: ${document.id}`
        );
        return document;
    }

    /**
     * Find a record by ID in the in-memory database.
     * @param {String} id - The ID of the record to be found
     * @param {Object} schema - The schema to be used for finding the data
     * @returns {Promise<*|null>} - The found document or null if not found
     */
    async findById(id, schema) {
        this.logger.info(`${this.dbName}: Finding record with id: ${id}`);
        const document = await schema.getById(id);
        if (!document) {
            this.logger.error(
                `${this.dbName}: Record with id: ${id} not found`
            );
            return null;
        }
        this.logger.info(
            `${this.dbName}: Record with id: ${id} found successfully`
        );
        return document;
    }

    /**
     * Find all records in the in-memory database.
     * @param {Object} schema - The schema to be used for finding the data
     * @returns {Promise<*>} - The found documents
     */
    async findAll(schema) {
        this.logger.info(`${this.dbName}: Finding all records`);
        const documents = await schema.getAll();
        if (!documents || documents.length === 0) {
            this.logger.error(`${this.dbName}: No records found`);
            return [];
        }
        this.logger.info(`${this.dbName}: Records found successfully`);
        return documents;
    }

    /**
     * Update a record in the in-memory database.
     * @param {String} id - The ID of the record to be updated
     * @param {Object} data - The data to be updated
     * @param {Object} schema - The schema to be used for updating the data
     * @returns {Promise<*|null>} - The updated document or null if not found
     */
    async update(id, data, schema) {
        this.logger.info(`${this.dbName}: Updating record with ID: ${id}`);
        const document = await schema.update(id, data);
        if (!document) {
            this.logger.error(
                `${this.dbName}: Record with ID: ${id} not found`
            );
            return null;
        }
        this.logger.info(
            `${this.dbName}: Record with id ${id} updated successfully to ${document.content}`
        );
        return document;
    }

    /**
     * Delete a record in the in-memory database.
     * @param {String} id - The ID of the record to be deleted
     * @param {Object} schema - The schema to be used for deleting the data
     * @returns {Promise<*|null>} - The deleted document or null if not found
     */
    async delete(id, schema) {
        this.logger.info(`${this.dbName}: Deleting record with ID: ${id}`);
        const document = await schema.delete(id);
        if (!document) {
            this.logger.error(
                `${this.dbName}: Record with ID: ${id} not found`
            );
            return null;
        }
        this.logger.info(
            `${this.dbName}: Record with id ${id} deleted successfully`
        );
        return document;
    }
}

module.exports = InMemoryDatabase;
