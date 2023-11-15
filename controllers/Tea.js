var Tea = require("../models/Tea");
exports.Tea_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Tea list');
 };
 // for a specific Costume.
 // for a specific Costume.
exports.Tea_detail = async function(req, res) {
  console.log("detail" + req.params.id)
  try {
  result = await Tea.findById( req.params.id)
  res.send(result)
  } catch (error) {
  res.status(500)
  res.send(`{"error": document for id ${req.params.id} not found`);
  }
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
//  exports.Tea_delete = function(req, res) {
//   res.send('NOT IMPLEMENTED: Tea delete DELETE ' + req.params.id);
//  };
 // Handle Costume update form on PUT.
 //Handle Costume update form on PUT.
exports.Tea_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await Tea.findById( req.params.id)
// Do updates of properties
if(req.body.Tea_flavour)
toUpdate.Tea_flavour = req.body.Tea_flavour;
if(req.body.Tea_cost) toUpdate.Tea_cost = req.body.Tea_cost;
if(req.body.Tea_quantity) toUpdate.Tea_quantity = req.body.Tea_quantity;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
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
 // Handle Costume delete on DELETE.
exports.Tea_delete = async function(req, res) {
console.log("delete " + req.params.id)
try {
result = await Tea.findByIdAndDelete( req.params.id)
console.log("Removed " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": Error deleting ${err}}`);
}
};
exports.Tea_view_one_Page = async function(req, res) {
  console.log("single view for id " + req.query.id)
  try{
  result = await Tea.findById( req.query.id)
  res.render('Teadetail',
  { title: 'Tea Detail', toShow: result });
  }
  catch(err){
  res.status(500)
  res.send(`{'error': '${err}'}`);
  }
  };
  exports.Tea_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('Teacreate', { title: 'Tea Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
    
