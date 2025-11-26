const mongoose = require("mongoose");

const AirlineSchema = new mongoose.Schema({
    airline: { type: String, required: true, unique: true }
}, { collection: "Airline" });

module.exports = mongoose.model("Airline", AirlineSchema);
