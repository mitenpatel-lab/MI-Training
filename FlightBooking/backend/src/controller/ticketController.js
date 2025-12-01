const tickets = require('../model/tickets');
const User = require('../model/users');
const mongoose = require('mongoose');


exports.createTicket = async (req, res) => {


    const { passengerInfo, username, flight_id, totalAmount } = req.body;
    try {
        const userId = await User.findOne({ username: username }, { _id: 1 }).lean();
        const ticketinfo = new tickets({
            userId: userId,
            flightId: flight_id,
            totalAmount: totalAmount,
            passengerInfo: passengerInfo
        });
        const ticketbooking = await ticketinfo.save();

        if (ticketbooking)
            res.status(200).json({
                success: true,
            });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to book ticket " + e.message,
            error: e.message
        });
    }
}

exports.getAllTickets = async (req, res) => {


    const { username } = req.query;
    try {
        const userId = await User.findOne({ username: username });
        const ticketbooking = await tickets.aggregate([
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


        if (ticketbooking)
            res.status(200).json({
                success: true,
                ticketbooking
            });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to book ticket " + e.message,
            error: e.message
        });
    }
}


exports.deleteTicket = async (req, res) => {

    try {
        let updateflights = await tickets.findByIdAndDelete(req.params.Id);

        if (updateflights) {
            return res.status(200).json({ message: "Removed successfully", status: 200 });
        }

    } catch (err) {
        return res.status(404).json({ message: err.message });

    }

}



exports.getTicketDetails = async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId;


    const { Id } = req.params;

    try {
        const getTicketDetails = await tickets.aggregate([
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

        if (getTicketDetails)
            res.status(200).json({
                success: true,
                getTicketDetails
            });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to book ticket " + e.message,
            error: e.message
        });
    }
}
