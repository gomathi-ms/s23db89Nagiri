const mongoose = require("mongoose")
const TeaSchema = mongoose.Schema({
Tea_flavour: String,
Tea_cost: Number,
Tea_quantity: Number
})
module.exports = mongoose.model("Tea",TeaSchema)

