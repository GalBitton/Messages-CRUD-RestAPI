const uuid = require('uuid');
const palindromeValidator = require('../utils/palindromeChecker');

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

    checkIfPalindrome() {
        return palindromeValidator(this.content);
    }

    setId(id) {
        this.id = id;
    }

    updateContent(content) {
        this.content = content;
        this.lastUpdatedTime = new Date().toISOString();
        this.isPalindrome = this.checkIfPalindrome();
    }
}

module.exports = Message;
