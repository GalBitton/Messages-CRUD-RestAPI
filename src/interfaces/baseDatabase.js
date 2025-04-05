/*
 * BaseDatabase Interface
 * This interface defines the basic structure for CRUD operations
 * that any database class should implement
 * will be used as a base class for other database classes (InMemory, MongoDB)
 */
class BaseDatabase {
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
