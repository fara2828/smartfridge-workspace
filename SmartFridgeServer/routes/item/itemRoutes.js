
const Router = require('express').Router;
const itemRouter = express.Router();
const { addItem, updateItem } = require('../controllers/itemController');

itemRouter.post('/addItem', addItem);
router.put('/update/:item_no', updateItem);

module.exports = itemRouter;

