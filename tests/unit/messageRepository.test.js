const { expect } = require('chai');
const sinon = require('sinon');
const MessageRepository = require('../../src/repositories/messageRepository');

describe('MessageRepository', () => {
    const mockDB = {
        create: sinon.stub(),
        findById: sinon.stub(),
        findAll: sinon.stub(),
        update: sinon.stub(),
        delete: sinon.stub(),
    };

    const schema = {};
    const mockLogger = {
        info: sinon.stub(),
        error: sinon.stub(),
    };
    const repository = new MessageRepository(mockDB, schema, mockLogger);

    it('should call db.create with the correct parameters and return result', async () => {
        const message = { id: '1', content: 'test' };
        mockDB.create.resolves(message);
        const result = await repository.create(message);
        expect(mockDB.create.calledWith(message, schema)).to.be.true;
        expect(result).to.equal(message);
    });

    it('should call db.findById with the correct parameters and return result', async () => {
        const message = { id: '1', content: 'test' };
        mockDB.findById.resolves(message);
        const result = await repository.findById('1');
        expect(mockDB.findById.calledWith('1', schema)).to.be.true;
        expect(result).to.equal(message);
    });

    it('should call db.findAll and return result', async () => {
        mockDB.findAll.resolves();
        const result = await repository.findAll();
        expect(mockDB.findAll.calledWith(schema)).to.be.true;
        expect(result).to.be.undefined;
    });

    it('should call db.update with the correct parameters and return result', async () => {
        const message = { id: '1', content: 'test' };
        mockDB.update.resolves(message);
        const result = await repository.update('1', message);
        expect(mockDB.update.calledWith('1', message, schema)).to.be.true;
        expect(result).to.equal(message);
    });

    it('should call db.delete with the correct parameters and return result', async () => {
        const message = { id: '1', content: 'delete' };
        mockDB.delete.resolves(message);
        const result = await repository.delete('1');
        expect(mockDB.delete.calledWith('1', schema)).to.be.true;
        expect(result).to.equal(message);
    });
});
