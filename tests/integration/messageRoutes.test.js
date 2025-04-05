const request = require('supertest');
const httpStatus = require('http-status-codes');
const { expect } = require('chai');
const app = require('../../src/app');
const container = require('../../src/container');

describe('Message Routes Integration Tests', () => {
    let createdId;

    before(async () => {
        // Setup DB Connection before running tests
        const database = container.get('database');
        await database.connect();
    });

    it('POST /messages - should create a new message', async () => {
        const res = await request(app)
            .post('/api/v1/messages')
            .send({ content: 'madam' })
            .expect(httpStatus.CREATED);

        expect(res.body.data.content).to.equal('madam');
        expect(res.body.data.isPalindrome).to.equal(true);
        createdId = res.body.data.id;
    });

    it('GET /messages - should fetch all the messages', async () => {
        const res = await request(app)
            .get('/api/v1/messages')
            .expect(httpStatus.OK);

        expect(res.body.data).to.be.an('array');
    });

    it('GET /messages/:id - should fetch a message by id', async () => {
        const res = await request(app)
            .get(`/api/v1/messages/${createdId}`)
            .expect(httpStatus.OK);

        expect(res.body.data.id).to.equal(createdId);
        expect(res.body.data.content).to.equal('madam');
        expect(res.body.data.isPalindrome).to.equal(true);
    });

    it('PUT /messages/:id - should update a message', async () => {
        const res = await request(app)
            .put(`/api/v1/messages/${createdId}`)
            .send({ content: 'test' })
            .expect(httpStatus.OK);

        expect(res.body.data.id).to.equal(createdId);
        expect(res.body.data.content).to.equal('test');
        expect(res.body.data.isPalindrome).to.equal(false);
    });

    it('DELETE /messages/:id - should delete a message', async () => {
        const res = await request(app)
            .delete(`/api/v1/messages/${createdId}`)
            .expect(httpStatus.OK);

        expect(res.body.deletedMessage.id).to.equal(createdId);
        expect(res.body.message).to.equal('Message deleted successfully');
    });
});
