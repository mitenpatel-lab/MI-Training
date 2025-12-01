const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
    },
    airline: { type: mongoose.Schema.Types.ObjectId, ref: "Airline" },
    status: {
        type: Number,
        default: 1
    },

    departure: {
        airportCode: { type: String, required: true },
        city: { type: String, required: true },
        scheduledTime: { type: Date, required: true },
        estimatedTime: { type: Date, required: true },
    },

    arrival: {
        airportCode: { type: String, required: true },
        city: { type: String, required: true },
        scheduledTime: { type: Date, required: true },
        estimatedTime: { type: Date, required: true },
    },

    duration: {
        type: String,
        required: true,
        default: "2 hr"
    },

    price: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    }
}, { timestamps: true });

module.exports = mongoose.model("Flight", flightSchema);
