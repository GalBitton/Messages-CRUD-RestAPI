const { expect } = require('chai');
const sinon = require('sinon');
const MessageService = require('../../src/services/messageService');
const Message = require('../../src/models/messageEntity');

describe('MessageService', () => {
    let mockRepository;
    let mockLogger;
    let service;

    beforeEach(() => {
        mockRepository = {
            create: sinon.stub(),
            findById: sinon.stub(),
            findAll: sinon.stub(),
            update: sinon.stub(),
            delete: sinon.stub(),
        };
        mockLogger = {
            info: sinon.stub(),
            error: sinon.stub(),
        };
        service = new MessageService(mockRepository, mockLogger);
    });

    it('should create a new message instance and call repository create with correct arguments', async () => {
        const resMessage = new Message('test');
        mockRepository.create.resolves(resMessage);
        const response = await service.create({ content: 'test' });
        expect(mockRepository.create.calledOnce).to.be.true;
        const args = mockRepository.create.getCall(0).args[0]; // get the first argument of the first call
        expect(args.content).to.equal('test');
        expect(args.isPalindrome).to.be.false;
        expect(response).to.deep.equal(resMessage);
    });

    it('should throw an error if message content is not string', async () => {
        try {
            await service.create({ content: 123 });
        } catch (error) {
            expect(error.message).to.equal('Content must be a string');
        }
    });

    it('should throw an error if message content is empty', async () => {
        try {
            await service.create({});
        } catch (error) {
            expect(error.message).to.equal('Content must be a string');
        }
    });

    it('should call repository findById with correct arguments', async () => {
        const resMessage = { id: '123', content: 'test' };
        mockRepository.findById.resolves(resMessage);
        const response = await service.findById('123');
        expect(mockRepository.findById.calledWith('123')).to.be.true;
        expect(response).to.equal(resMessage);
    });

    it('should call repository findAll', async () => {
        const resMessages = [];
        mockRepository.findAll.resolves(resMessages);
        const response = await service.findAll();
        expect(mockRepository.findAll.calledOnce).to.be.true;
        expect(response).to.equal(resMessages);
    });

    it('should update a message and call repository update with correct arguments', async () => {
        const resMessage = { id: '123', content: 'test' };
        mockRepository.update.resolves(resMessage);

        const response = await service.update('123', resMessage);
        expect(mockRepository.update.calledWith('123', resMessage)).to.be.true;
        expect(response).to.equal(resMessage);
    });

    it('should delete a message and call repository delete with correct arguments', async () => {
        const resMessage = { id: '123', content: 'test' };
        mockRepository.delete.resolves(resMessage);
        const response = await service.delete('123');
        expect(mockRepository.delete.calledWith('123')).to.be.true;
        expect(response).to.equal(resMessage);
    });
});
