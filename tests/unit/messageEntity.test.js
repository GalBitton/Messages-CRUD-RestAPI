const { expect } = require('chai');
const Message = require('../../src/models/messageEntity');

describe('Message Entity', () => {
    it('Should create a message entity with valid properties', () => {
        const message = new Message('test');
        expect(message).to.be.a('object');
        expect(message.id).to.be.a('string');
        expect(message.content).to.equal('test');
        expect(message.creationTime).to.be.a('string');
        expect(message.lastUpdatedTime).to.be.a('string');
        expect(message.isPalindrome).to.be.equal(false);
    });

    it('Should throw an error when content is not a string', () => {
        expect(() => new Message(123)).to.throw('Content must be a string');
    });

    it('Should check if the message is a palindrome correctly', () => {
        const message = new Message('racecar');
        expect(message.isPalindrome).to.be.true;

        const nonPalindromeMessage = new Message('hello');
        expect(nonPalindromeMessage.isPalindrome).to.be.false;
    });

    it('Should update the content if updated flag is true', () => {
        const message = new Message('test');
        expect(message.content).to.equal('test');

        message.updateContent('madam');
        expect(message.content).to.equal('madam');
    });

    it('Should update the last time updated if updated flag is false', () => {
        const message = new Message('test');
        expect(message.lastUpdatedTime).to.equal(message.creationTime);

        setTimeout(() => {
            message.updateContent('updated');
            expect(message.lastUpdatedTime).to.not.equal(message.creationTime);
        }, 1000);
    });

    it('Should check if the message is a palindrome after updating content', () => {
        const message = new Message('test');
        expect(message.isPalindrome).to.be.false;

        message.updateContent('madam');
        expect(message.isPalindrome).to.be.true;
    });

    it('Should change the id of the message successfully', () => {
        const message = new Message('test');
        expect(message.id).to.not.equal('123');

        message.setId('123');
        expect(message.id).to.equal('123');
    });
});
