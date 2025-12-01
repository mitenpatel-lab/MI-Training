const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
    totalAmount: { type: Number, required: true },
    passengerInfo: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        email: { type: String, required: true }
    }


}, { timestamps: true });

module.exports = mongoose.model("Tickets", ticketSchema);
