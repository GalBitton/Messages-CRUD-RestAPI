// baseDatabase.js

/**
 * BaseDatabase Abstract class
 * This class defines the interface for all database CRUD operations.
 * It should be extended by any concrete database implementation, modularizing the code.
 */
class BaseDatabase {
    constructor(dbName, config, logger) {
        this.dbName = dbName;
        this.config = config;
        this.logger = logger;
    }
    async connect() {
        throw new Error("Method 'connect()' must be implemented.");
    }
    async disconnect() {
        throw new Error("Method 'disconnect()' must be implemented.");
    }
    async create(data, schema = null) {
        throw new Error("Method 'create()' must be implemented.");
    }
    async findById(id, schema = null) {
        throw new Error("Method 'findById()' must be implemented.");
    }
    async findAll(schema = null) {
        throw new Error("Method 'findAll()' must be implemented.");
    }
    async update(id, data, schema = null) {
        throw new Error("Method 'update()' must be implemented.");
    }
    async delete(id, schema = null) {
        throw new Error("Method 'delete()' must be implemented.");
    }
}

module.exports = BaseDatabase;
