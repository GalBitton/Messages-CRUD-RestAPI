const Joi = require('joi');
const httpStatusCodes = require('http-status-codes');

const messageSchema = Joi.object({
    content: Joi.string().required().min(0).max(1000).trim().message({
        'string.max':
            'Content must be less than or equal to 10000 characters long',
    }),
});

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
