var express = require('express');
const Tea_controlers= require('../controllers/Tea');
var router = express.Router();

/* GET home page. */
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    } 

router.get('/', secured, Tea_controlers.Tea_view_all_Page );
router.get('/detail', secured,Tea_controlers.Tea_view_one_Page);
router.get('/create',secured, Tea_controlers.Tea_create_Page);
router.get('/update', secured,Tea_controlers.Tea_update_Page);
router.get('/delete', secured,Tea_controlers.Tea_delete_Page);

module.exports = router;

