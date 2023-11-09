var Tea = require("../models/Tea");
exports.Tea_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea list');
 };
 // for a specific Costume.
 exports.Tea_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea detail: ' + req.params.id);
 };
 // Handle Costume create on POST.
 // Handle Costume create on POST.
exports.Tea_create_post = async function(req, res) {
  console.log(req.body)
  let document = new Tea();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"costume_type":"goat", "cost":12, "size":"large"}
  document.Tea_flavour = req.body.Tea_flavour;
  document.Tea_cost = req.body.Tea_cost;
  document.Tea_quantity = req.body.Tea_quantity;
  try{
  let result = await document.save();
  res.send(result);
  }
  catch(err){
  res.status(500);
  res.send(`{"error": ${err}}`);
  }
 };
 
 // Handle Costume delete form on DELETE.
 exports.Tea_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea delete DELETE ' + req.params.id);
 };
 // Handle Costume update form on PUT.
 exports.Tea_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea update PUT' + req.params.id);
 };
 exports.Tea_list = async function(req, res) {
  try{
  theTeas = await Tea.find();
  res.send(theTeas);
  }
  catch(err){
  res.status(500);
  res.send(`{"error": ${err}}`);
  }
 };

 // VIEWS
// Handle a show all view
exports.Tea_view_all_Page = async function(req, res) {
  try{
  theTeas = await Tea.find();
  res.render('Tea', { title: 'Tea Search Results', results: theTeas });
  }
  catch(err){
  res.status(500);
  res.send(`{"error": ${err}}`);
  }
 };
 