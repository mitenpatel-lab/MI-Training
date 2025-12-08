const tickets = require('../model/tickets');
const User = require('../model/users');
const mongoose = require('mongoose');

exports.createTicket = async (username, body) => {
    const { passengerInfo, flight_id, totalAmount } = body;

    const userId = await User.findOne({ username: username }, { _id: 1 }).lean();
    const ticketinfo = new tickets({
        userId: userId,
        flightId: flight_id,
        totalAmount: totalAmount,
        passengerInfo: passengerInfo
    });
    return await ticketinfo.save();
}

exports.getAllTickets = async (username) => {

    try {
        const userId = await User.findOne({ username: username });
        console.log(userId);

        return await tickets.aggregate([
            { $match: { userId: userId._id } },

            {
                $lookup: {
                    from: "flights",
                    localField: "flightId",
                    foreignField: "_id",
                    as: "flightDetails"
                }
            },

            { $unwind: "$flightDetails" },

            {
                $lookup: {
                    from: "Airline",
                    localField: "flightDetails.airline",
                    foreignField: "_id",
                    as: "airlineData"
                }
            },

            { $unwind: { path: "$airlineData", preserveNullAndEmptyArrays: true } },

            {
                $project: {

                    Airline: "$airlineData.airline",
                    FlightNo: "$flightDetails.flightNumber",
                    From: "$flightDetails.departure.city",
                    To: "$flightDetails.arrival.city",
                    DepartureDate: "$flightDetails.departure.scheduledTime",
                    ArrivalDate: "$flightDetails.arrival.scheduledTime",
                }
            }
        ]);

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to book ticket " + e.message,
            error: e.message
        });
    }
}

exports.getTicketDetails = async (param) => {
    const ObjectId = mongoose.Types.ObjectId;


    const { Id } = param;

    try {
        return await tickets.aggregate([
            { $match: { _id: new ObjectId(Id) } },

            {
                $lookup: {
                    from: "flights",
                    localField: "flightId",
                    foreignField: "_id",
                    as: "flightDetails"
                }
            },

            { $unwind: "$flightDetails" },

            {
                $lookup: {
                    from: "Airline",
                    localField: "flightDetails.airline",
                    foreignField: "_id",
                    as: "airlineData"
                }
            },

            { $unwind: { path: "$airlineData", preserveNullAndEmptyArrays: true } },

            {
                $project: {

                    airline: "$airlineData.airline",
                    flightNumber: "$flightDetails.flightNumber",
                    from: "$flightDetails.departure.city",
                    to: "$flightDetails.arrival.city",
                    date: "$flightDetails.departure.scheduledTime",
                    time: "$flightDetails.arrival.scheduledTime",
                    price: "$totalAmount",
                    passengerInfo: 1
                }
            }
        ]);

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to book ticket " + e.message,
            error: e.message
        });
    }
}

exports.deleteTicket = async (id) => {

    return await tickets.findByIdAndDelete(id);
}