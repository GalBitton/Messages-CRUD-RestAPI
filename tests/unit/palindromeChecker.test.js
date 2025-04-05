const { expect } = require('chai');
const isPalindrome = require('../../src/utils/palindromeChecker');

describe('Palindrome Checker', () => {
    it('should return true for a palindrome string', () => {
        expect(isPalindrome('This is a palindrome     emordnilap  a si sihT'))
            .to.be.true;
        expect(isPalindrome('was it a car or a cat i saw')).to.be.true;
        expect(isPalindrome('a')).to.be.true;
        expect(isPalindrome('racecar')).to.be.true;
    });

    it('Should return false for a non-palindrome string', () => {
        expect(isPalindrome('hello world')).to.be.false;
        expect(isPalindrome('This is not a a palindrome')).to.be.false;
    });

    it('Should return true for an empty string', () => {
        expect(isPalindrome('')).to.be.true;
    });

    it('Should return true for case-sensitive mismatches', () => {
        expect(isPalindrome('RaceCAR')).to.be.true;
        expect(isPalindrome('Hello')).to.be.false;
    });

    it('Should return true for a string with numbers', () => {
        expect(isPalindrome('12344321')).to.be.true;
        expect(isPalindrome('palindrome12321emordnilap')).to.be.true;
    });
});
