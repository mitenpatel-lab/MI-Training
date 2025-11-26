const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    airline: { type: mongoose.Schema.Types.ObjectId, ref: "Airline" },
    aircraftType: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },

    departure: {
        airportCode: { type: String, required: true },
        city: { type: String, required: true },
        scheduledTime: { type: Date, required: true },
        estimatedTime: { type: Date, required: true },
        terminal: { type: String },
        gate: { type: String }
    },

    arrival: {
        airportCode: { type: String, required: true },
        city: { type: String, required: true },
        scheduledTime: { type: Date, required: true },
        estimatedTime: { type: Date, required: true },
        terminal: { type: String },
        gate: { type: String }
    },

    duration: {
        type: String,
        required: true
    },

    price: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    }
}, { timestamps: true });

module.exports = mongoose.model("Flight", flightSchema);
