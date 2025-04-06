// messageEntity.js

const uuid = require('uuid');
const palindromeValidator = require('../utils/palindromeChecker');

/**
 * Message class represents a message entity.
 * It represents the structure of a message and provides methods to manipulate it.
 * It includes properties like id, content, creation time, last updated time, and whether the content is a palindrome.
 */
class Message {
    constructor(content) {
        // Validate content type
        if (typeof content !== 'string') {
            throw new Error('Content must be a string');
        }

        this.id = uuid.v4();
        this.content = content;
        this.creationTime = new Date().toISOString();
        this.lastUpdatedTime = this.creationTime;
        this.isPalindrome = this.checkIfPalindrome();
    }

    /**
     * Check if the content is a palindrome.
     * @returns {boolean}
     */
    checkIfPalindrome() {
        return palindromeValidator(this.content);
    }

    /**
     * Get the message content.
     * @param {String} id - The ID of the message.
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Update the message content.
     * @param {String} content - The new content of the message.
     */
    updateContent(content) {
        this.content = content;
        this.lastUpdatedTime = new Date().toISOString();
        this.isPalindrome = this.checkIfPalindrome();
    }
}

module.exports = Message;
