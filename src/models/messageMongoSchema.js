const mongoose = require('mongoose');
const BaseSchema = require('../interfaces/baseSchema');
const checkIfPalindrome = require('../utils/palindromeChecker');
class MessageMongoSchema extends BaseSchema {
    constructor() {
        super('Message Mongo Schema');
        this.schema = new mongoose.Schema(
            {
                id: {
                    type: String,
                    required: true,
                    unique: true, // Ensure id is unique, help for faster queries
                },
                content: {
                    type: String,
                    required: true,
                },
                isPalindrome: {
                    type: Boolean,
                    default: false,
                },
            },
            {
                timestamps: {
                    createdAt: 'creationTime',
                    updatedAt: 'lastUpdatedTime',
                },
                collection: 'messages',
            }
        );
        this.schema.set('toJSON', {
            transform: (doc, ret) => {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        });
        this.model = mongoose.model('Message', this.schema);
    }

    // Overriding the BaseSchema methods in order to use mongoose model
    async create(data) {
        const doc = await this.model.create(data);
        return doc;
    }

    async getById(id) {
        const doc = await this.model.findOne({ id: id });
        if (!doc) {
            throw new Error(`Message with id ${id} not found`);
        }
        return doc;
    }

    async getAll() {
        const docs = await this.model.find();
        return docs;
    }

    async update(id, data) {
        const isPalindrome = checkIfPalindrome(data.content);

        const updatedData = {
            ...data,
            isPalindrome,
            lastUpdatedTime: new Date().toISOString(),
        };
        const doc = await this.model.findOneAndUpdate({ id: id }, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!doc) {
            throw new Error(`Message with id ${id} not found`);
        }
        return doc;
    }

    async delete(id) {
        const doc = await this.model.findOneAndDelete({ id: id });
        if (!doc) {
            throw new Error(`Message with id ${id} not found`);
        }
        return doc;
    }
}

module.exports = MessageMongoSchema;
