const httpStatus = require('http-status-codes');
class BaseController {
    constructor(service) {
        this.service = service;
    }

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
