function isPalindrome(str) {
    // Remove all non-alphanumeric characters by replacing them with an empty string
    // Convert the string to lowercase
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Palindrome check - compare the cleaned string with its reverse string
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

module.exports = isPalindrome;
