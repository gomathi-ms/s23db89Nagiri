var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var Tea_controller = require('../controllers/Tea');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/Teas', Tea_controller.Tea_create_post);
// DELETE request to delete Costume.
router.delete('/Teas/:id', Tea_controller.Tea_delete);
// PUT request to update Costume.
router.put('/Teas/:id', Tea_controller.Tea_update_put);
// GET request for one Costume.
router.get('/Teas/:id', Tea_controller.Tea_detail);
// GET request for list of all Costume items.
router.get('/Teas', Tea_controller.Tea_list);
router.get('/detail', Tea_controller.Tea_view_one_Page);
router.get('/create', Tea_controller.Tea_create_Page);
module.exports = router;