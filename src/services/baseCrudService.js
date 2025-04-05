class BaseCrudService {
    constructor(serviceName, repository, logger) {
        this.serviceName = serviceName;
        this.repository = repository;
        this.logger = logger;
    }

    async findAll() {
        this.logger.info(`Service ${this.serviceName} find all`);
        return this.repository.findAll();
    }

    async findById(id) {
        this.logger.info(`Service ${this.serviceName} find by id ${id}`);
        return this.repository.findById(id);
    }

    async create(data) {
        this.logger.info(`Service ${this.serviceName} create`);
        return this.repository.create(data);
    }

    async update(id, data) {
        this.logger.info(`Service ${this.serviceName} update ${id}`);
        return this.repository.update(id, data);
    }

    async delete(id) {
        this.logger.info(`Service ${this.serviceName} delete ${id}`);
        return this.repository.delete(id);
    }
}

module.exports = BaseCrudService;
