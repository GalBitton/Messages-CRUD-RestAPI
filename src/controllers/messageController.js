const BaseController = require('./baseController');

class MessageController extends BaseController {
    constructor(messageService) {
        super(messageService);
    }
}

module.exports = MessageController;
