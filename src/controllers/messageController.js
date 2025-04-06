// messageController.js

const BaseController = require('./baseController');

/*
 * MessageController class extends the BaseController to handle CRUD operations for messages.
 * This class uses the MessageService to interact with the database.
 */
class MessageController extends BaseController {
    constructor(messageService) {
        super(messageService);
    }
}

module.exports = MessageController;
