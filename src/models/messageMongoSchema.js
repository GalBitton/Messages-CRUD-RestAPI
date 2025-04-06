// messageMongoSchema.js
const mongoose = require('mongoose');
const BaseSchema = require('../interfaces/baseSchema');
const checkIfPalindrome = require('../utils/palindromeChecker');

/**
 * MessageMongoSchema class extends the BaseSchema to handle CRUD operations for MongoDB.
 * This class uses Mongoose to interact with the MongoDB database.
 */
class MessageMongoSchema extends BaseSchema {
    constructor() {
        super('Message Mongo Schema');
        // Define the schema for the Message model
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
        // Make sure the returned object will not include _id and __v properties
        this.schema.set('toJSON', {
            transform: (doc, ret) => {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        });
        // Create the Mongoose model
        this.model = mongoose.model('Message', this.schema);
    }

    /**
     * Creates a new message in the MongoDB database.
     * @param {Object} data - The message data to be created
     * @returns {Promise<(Object)>} - The created message object
     */
    async create(data) {
        const doc = await this.model.create(data);
        return doc;
    }

    /**
     * Finds a message by ID in the MongoDB database.
     * @param {String} id - The ID of the message to be found
     * @returns {Promise<(Object)>} - The found message object or null if not found
     */
    async getById(id) {
        const doc = await this.model.findOne({ id: id });
        if (!doc) {
            throw new Error(`Message with id ${id} not found`);
        }
        return doc;
    }

    /**
     * Retrieves all messages from the MongoDB database.
     * @returns {Promise<(Object)>} - An array of all message objects
     */
    async getAll() {
        const docs = await this.model.find();
        return docs;
    }

    /**
     * Updates a message by ID in the MongoDB database.
     * @param {String} id - The ID of the message to be updated
     * @param {Object} data - The new data to update the message with
     * @returns {Promise<(Object)>} - The updated message object or null if not found
     */
    async update(id, data) {
        // First, check if the content is a palindrome
        const isPalindrome = checkIfPalindrome(data.content);

        // Create a new content object with the updated content and isPalindrome status
        const updatedData = {
            ...data,
            isPalindrome,
            lastUpdatedTime: new Date().toISOString(),
        };
        // Update the message in the database
        const doc = await this.model.findOneAndUpdate({ id: id }, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!doc) {
            throw new Error(`Message with id ${id} not found`);
        }
        return doc;
    }

    /**
     * Deletes a message by ID from the MongoDB database.
     * @param {String} id - The ID of the message to be deleted
     * @returns {Promise<(Object)>} - The deleted message object or null if not found
     */
    async delete(id) {
        const doc = await this.model.findOneAndDelete({ id: id });
        if (!doc) {
            throw new Error(`Message with id ${id} not found`);
        }
        return doc;
    }
}

module.exports = MessageMongoSchema;
