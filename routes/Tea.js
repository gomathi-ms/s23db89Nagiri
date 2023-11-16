var express = require('express');
const Tea_controlers= require('../controllers/Tea');
var router = express.Router();

/* GET home page. */

router.get('/', Tea_controlers.Tea_view_all_Page );
router.get('/detail', Tea_controlers.Tea_view_one_Page);
router.get('/create', Tea_controlers.Tea_create_Page);
router.get('/update', Tea_controlers.Tea_update_Page);
router.get('/delete', Tea_controlers.Tea_delete_Page);

module.exports = router;

