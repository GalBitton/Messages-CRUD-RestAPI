// baseRepository.js

/**
 * BaseRepository class, generic repository for CRUD operations on a database given a schema.
 * This class is intended to be extended by specific repositories for different entities.
 */
class BaseRepository {
    constructor(repositoryName, database, schema, logger) {
        this.repositoryName = repositoryName;
        this.database = database;
        this.schema = schema;
        this.logger = logger;
    }

    /**
     * Creates a new record in the database.
     * @param {Object} data - The data to be inserted into the database.
     * @returns {Promise<data>} - The created record.
     */
    async create(data) {
        this.logger.info(
            `${this.repositoryName}: Creating new record with id ${data.id}`
        );
        return this.database.create(data, this.schema);
    }

    /**
     * Finds a record by its ID.
     * @param {String} id - The ID of the record to be found.
     * @returns {Promise<*>} - The found record.
     */
    async findById(id) {
        this.logger.info(
            `${this.repositoryName}: Finding record with id ${id}`
        );
        return this.database.findById(id, this.schema);
    }

    /**
     * Finds all records in the database.
     * @returns {Promise<*>} - An array of all records.
     */
    async findAll() {
        this.logger.info(`${this.repositoryName}: Finding all records`);
        return this.database.findAll(this.schema);
    }

    /**
     * Updates a record by its ID.
     * @param {String} id - The ID of the record to be updated.
     * @param {Object} data - The data to be updated.
     * @returns {Promise<*>} - The updated record.
     */
    async update(id, data) {
        this.logger.info(
            `${this.repositoryName}: Updating record with id ${id}`
        );
        return this.database.update(id, data, this.schema);
    }

    /**
     * Deletes a record by its ID.
     * @param {String} id - The ID of the record to be deleted.
     * @returns {Promise<*>} - The deleted record.
     */
    async delete(id) {
        this.logger.info(
            `${this.repositoryName}: Deleting record with id ${id}`
        );
        return this.database.delete(id, this.schema);
    }
}

module.exports = BaseRepository;
