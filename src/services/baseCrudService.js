// baseCrudService.js

/**
 * BaseCrudService class, generic service for CRUD operations.
 */
class BaseCrudService {
    constructor(serviceName, repository, logger) {
        this.serviceName = serviceName;
        this.repository = repository;
        this.logger = logger;
    }

    /**
     * Finds all records in the database.
     * @returns {Promise<*>} - An array of all records.
     */
    async findAll() {
        this.logger.info(`${this.serviceName}: find all`);
        return this.repository.findAll();
    }

    /**
     * Finds a record by its ID.
     * @param {String} id - The ID of the record to be found.
     * @returns {Promise<*>} - The found record.
     */
    async findById(id) {
        this.logger.info(`${this.serviceName}: find by id ${id}`);
        return this.repository.findById(id);
    }

    /**
     * Creates a new record in the database.
     * @param {Object} data - The data to be inserted into the database.
     * @returns {Promise<data>} - The created record.
     */
    async create(data) {
        this.logger.info(`${this.serviceName}: create`);
        return this.repository.create(data);
    }

    /**
     * Updates a record by its ID.
     * @param {String} id - The ID of the record to be updated.
     * @param {Object} data - The data to be updated.
     * @returns {Promise<*>} - The updated record.
     */
    async update(id, data) {
        this.logger.info(`${this.serviceName}: update ${id}`);
        return this.repository.update(id, data);
    }

    /**
     * Deletes a record by its ID.
     * @param {String} id - The ID of the record to be deleted.
     * @returns {Promise<*>} - The deleted record.
     */
    async delete(id) {
        this.logger.info(`${this.serviceName}: delete ${id}`);
        return this.repository.delete(id);
    }
}

module.exports = BaseCrudService;
