const { expect } = require('chai');
const InMemoryDatabase = require('../../src/models/inMemoryDatabase');
const MessageInMemorySchema = require('../../src/models/messageInMemorySchema');

describe('InMemoryDatabase', () => {
    let db;
    let schema;

    beforeEach(() => {
        db = new InMemoryDatabase({}, console);
        schema = new MessageInMemorySchema();
    });

    it('should initialize the database with an empty data object', async () => {
        const data = await db.findAll(schema);
        expect(data).to.deep.equal([]);
    });

    it('should create a new document and save it', async () => {
        const document = { id: '1', content: 'Hello world!' };
        await db.create(document, schema);
        const data = await db.findAll(schema);
        expect(data.length).to.equal(1);
    });

    it('should find a document by ID', async () => {
        const document = { id: '1', content: 'Hello world!' };
        await db.create(document, schema);
        const foundDocument = await db.findById('1', schema);
        expect(foundDocument.id).to.equal(document.id);
        expect(foundDocument.content).to.equal(document.content);
    });

    it('should return null if document not found by ID', async () => {
        const foundDocument = await db.findById('999', schema);
        expect(foundDocument).to.be.null;
    });

    it('should update a document by ID', async () => {
        const document = { id: '1', content: 'Hello world!' };
        await db.create(document, schema);
        const updatedDocument = { content: 'test' };
        const result = await db.update('1', updatedDocument, schema);
        expect(result.content).to.equal('test');
    });

    it('should mark the isPalindrome field to true when creating palindrome content', async () => {
        const document = { id: '1', content: 'madam' };
        const createdDocument = await db.create(document, schema);
        expect(createdDocument.isPalindrome).to.be.true;
    });

    it('should update the isPalindrome field when updating content', async () => {
        const document = { id: '1', content: 'madame' };
        await db.create(document, schema);
        const result = await db.update('1', { content: 'madam' }, schema);
        expect(result.isPalindrome).to.be.true;
    });

    it('should update the lastUpdatedTime field when updating content', async () => {
        const document = { id: '1', content: 'test' };
        await db.create(document, schema);
        setTimeout(async () => {
            const result = await db.update('1', { content: 'updated' }, schema);
            expect(result.lastUpdatedTime).to.not.equal(document.creationTime);
        }, 1000);
    });

    it('should return null if document not found when updating', async () => {
        const updatedDocument = { content: 'test' };
        const result = await db.update('999', updatedDocument, schema);
        expect(result).to.be.null;
    });

    it('should delete a document by ID', async () => {
        const document = { id: '1', content: 'test' };
        await db.create(document, schema);
        await db.delete('1', schema);
        const data = await db.findAll(schema);
        // Make sure the document was deleted
        expect(data.length).to.equal(0);
    });

    it('should delete a document by ID and return the deleted document', async () => {
        const document = { id: '1', content: 'test' };
        await db.create(document, schema);
        const deletedDocument = await db.delete('1', schema);
        expect(deletedDocument.id).to.equal('1');
        expect(deletedDocument.content).to.equal('test');
    });

    it('should return null if document not found when deleting', async () => {
        const deletedDocument = await db.delete('999', schema);
        expect(deletedDocument).to.be.null;
    });
});
