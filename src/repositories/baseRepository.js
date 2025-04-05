class BaseRepository {
    constructor(database, schema) {
        this.database = database;
        this.schema = schema;
    }

    async create(data) {
        return this.database.create(data, this.schema);
    }

    async findById(id) {
        return this.database.findById(id, this.schema);
    }

    async findAll() {
        return this.database.findAll(this.schema);
    }

    async update(id, data) {
        return this.database.update(id, data, this.schema);
    }

    async delete(id) {
        return this.database.delete(id, this.schema);
    }
}

module.exports = BaseRepository;
