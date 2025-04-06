// baseController.js

const httpStatus = require('http-status-codes');

/*
 * BaseController class provides generic common CRUD operations for any resource.
 * This class uses a service layer to interact with the database.
 */
class BaseController {
    constructor(service) {
        this.service = service;
    }

    /**
     * Get all records from the database using the service layer - READ operation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    getAll = async (req, res) => {
        try {
            const data = await this.service.findAll();
            res.status(httpStatus.OK).json({
                data,
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    };

    /**
     * Get a single record by ID from the database using the service layer - READ operation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    getOne = async (req, res) => {
        try {
            const data = await this.service.findById(req.params.id);
            res.status(httpStatus.OK).json({
                data,
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    };

    /**
     * Delete a record by ID from the database using the service layer - DELETE operation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    delete = async (req, res) => {
        try {
            const deletedMessage = await this.service.delete(req.params.id);
            res.status(httpStatus.OK).json({
                deletedMessage,
                message: 'Message deleted successfully',
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    };

    /**
     * Create a new record in the database using the service layer - CREATE operation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    create = async (req, res) => {
        try {
            const data = await this.service.create(req.body);
            res.status(httpStatus.CREATED).json({
                data,
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    };

    /**
     * Update a record by ID and Content in the database using the service layer - UPDATE operation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    update = async (req, res) => {
        try {
            const data = await this.service.update(req.params.id, req.body);
            res.status(httpStatus.OK).json({
                data,
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    };
}

module.exports = BaseController;
