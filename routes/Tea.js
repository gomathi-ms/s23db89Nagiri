var express = require('express');
const Tea_controlers= require('../controllers/Tea');
var router = express.Router();

/* GET home page. */

router.get('/', Tea_controlers.Tea_view_all_Page );

module.exports = router;

