// palindromeChecker.js

/**
 * Checks if a given string is a palindrome, ignoring case and non-alphanumeric characters.
 * @param {String }str - The string to be checked.
 * @returns {boolean} - True if the string is a palindrome, false otherwise.
 */
function isPalindrome(str) {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

module.exports = isPalindrome;
