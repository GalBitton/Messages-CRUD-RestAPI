// validateMessage.js

const Joi = require('joi');
const httpStatusCodes = require('http-status-codes');

/**
 * Message validation schema using Joi.
 * This ensures that the content is a non-empty string with a max length of 1000 characters.
 * @type {Joi.ObjectSchema<any>}
 */
const messageSchema = Joi.object({
    content: Joi.string().required().min(0).max(1000).trim().message({
        'string.max':
            'Content must be less than or equal to 10000 characters long',
    }),
});

/**
 * Middleware to validate incoming messages requests.
 * This middleware checks if the request body contains a valid message.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Callback function to pass control to the next middleware
 * @returns {Object|void} - Returns a 400 Bad Request response if validation fails, otherwise calls the next middleware
 */
const validateMessage = (req, res, next) => {
    const { error } = messageSchema.validate(req.body);

    if (error) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
            message: error.details[0].message,
        });
    }

    next();
};

module.exports = validateMessage;
