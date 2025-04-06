// baseController.js

const httpStatus = require('http-status-codes');

/**
 * BaseController class provides generic common CRUD operations for any resource.
 * This class uses a service layer to interact with the database.
 */
class BaseController {
    constructor(controllerName, service, logger) {
        this.controllerName = controllerName;
        this.service = service;
        this.logger = logger;
    }

    /**
     * Get all records from the database using the service layer - READ operation
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    getAll = async (req, res) => {
        try {
            this.logger.info(
                `${this.controllerName}: trying to get all records`
            );
            const data = await this.service.findAll();
            this.logger.info(
                `${this.controllerName}: got all records successfully`
            );
            res.status(httpStatus.OK).json({
                data,
            });
        } catch (err) {
            this.logger.error(
                `${this.controllerName}: error getting all records: ${err}`
            );
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
            this.logger.info(
                `${this.controllerName}: trying to get record with ID: ${req.params.id}`
            );
            const data = await this.service.findById(req.params.id);
            this.logger.info(
                `${this.controllerName}: got record with ID: ${req.params.id} successfully`
            );
            res.status(httpStatus.OK).json({
                data,
            });
        } catch (err) {
            this.logger.error(
                `${this.controllerName}: error getting record with ID: ${req.params.id}: ${err}`
            );
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
            this.logger.info(
                `${this.controllerName}: trying to delete record with ID: ${req.params.id}`
            );
            const deletedMessage = await this.service.delete(req.params.id);
            this.logger.info(
                `${this.controllerName}: deleted record with ID: ${req.params.id} successfully`
            );
            res.status(httpStatus.OK).json({
                deletedMessage,
                message: 'Message deleted successfully',
            });
        } catch (err) {
            this.logger.error(
                `${this.controllerName}: error deleting record with ID: ${req.params.id}: ${err}`
            );
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
            this.logger.info(
                `${this.controllerName}: trying to create a new record`
            );
            const data = await this.service.create(req.body);
            this.logger.info(
                `${this.controllerName}: created a new record successfully`
            );
            res.status(httpStatus.CREATED).json({
                data,
            });
        } catch (err) {
            this.logger.error(
                `${this.controllerName}: error creating a new record: ${err}`
            );
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
            this.logger.info(
                `${this.controllerName}: trying to update record with ID: ${req.params.id}`
            );
            const data = await this.service.update(req.params.id, req.body);
            this.logger.info(
                `${this.controllerName}: updated record with ID: ${req.params.id} to ${req.body.content} successfully`
            );
            res.status(httpStatus.OK).json({
                data,
            });
        } catch (err) {
            this.logger.error(
                `${this.controllerName} error updating record with ID: ${req.params.id}: ${err}`
            );
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    };
}

module.exports = BaseController;
