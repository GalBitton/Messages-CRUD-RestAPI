// baseSchema.js

/**
 * BaseSchema Abstract class
 * This class defines the interface for interacting with specific database schemas for CRUD operations.
 * It should be extended by any concrete database schema, modularizing the code.
 */
class BaseSchema {
    constructor(schemaName) {
        this.schemaName = schemaName;
    }
    async create(data) {
        throw new Error('Method create() not implemented');
    }
    async getById(id) {
        throw new Error('Method getById() not implemented');
    }
    async getAll() {
        throw new Error('Method getAll() not implemented');
    }
    async update(id, data) {
        throw new Error('Method update(id,data) not implemented');
    }
    async delete(id) {
        throw new Error('Method delete(id) not implemented');
    }
}

module.exports = BaseSchema;
