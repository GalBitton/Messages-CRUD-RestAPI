// baseRepository.js

/**
 * BaseRepository class, generic repository for CRUD operations on a database given a schema.
 * This class is intended to be extended by specific repositories for different entities.
 */
class BaseRepository {
    constructor(database, schema) {
        this.database = database;
        this.schema = schema;
    }

    /**
     * Creates a new record in the database.
     * @param {Object} data - The data to be inserted into the database.
     * @returns {Promise<data>} - The created record.
     */
    async create(data) {
        return this.database.create(data, this.schema);
    }

    /**
     * Finds a record by its ID.
     * @param {String} id - The ID of the record to be found.
     * @returns {Promise<*>} - The found record.
     */
    async findById(id) {
        return this.database.findById(id, this.schema);
    }

    /**
     * Finds all records in the database.
     * @returns {Promise<*>} - An array of all records.
     */
    async findAll() {
        return this.database.findAll(this.schema);
    }

    /**
     * Updates a record by its ID.
     * @param {String} id - The ID of the record to be updated.
     * @param {Object} data - The data to be updated.
     * @returns {Promise<*>} - The updated record.
     */
    async update(id, data) {
        return this.database.update(id, data, this.schema);
    }

    /**
     * Deletes a record by its ID.
     * @param {String} id - The ID of the record to be deleted.
     * @returns {Promise<*>} - The deleted record.
     */
    async delete(id) {
        return this.database.delete(id, this.schema);
    }
}

module.exports = BaseRepository;
