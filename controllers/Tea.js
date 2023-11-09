var Tea = require("../models/Tea");
exports.Tea_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea list');
 };
 // for a specific Costume.
 exports.Tea_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea detail: ' + req.params.id);
 };
 // Handle Costume create on POST.
 exports.Tea_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea create POST');
 };
 // Handle Costume delete form on DELETE.
 exports.Tea_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea delete DELETE ' + req.params.id);
 };
 // Handle Costume update form on PUT.
 exports.Tea_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea update PUT' + req.params.id);
 };