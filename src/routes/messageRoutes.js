const express = require('express');
const router = express.Router();
const container = require('../container');
const controller = container.get('messageController');
const validateMessage = require('../middlewares/validateMessage');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', validateMessage, controller.create);
router.put('/:id', validateMessage, controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
