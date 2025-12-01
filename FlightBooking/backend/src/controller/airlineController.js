const airline = require('../model/airlines');
const mongoose = require('mongoose');
const flightInfo = require('../model/flightInfo');

exports.getAllAirlines = async (req, res) => {
    try {
        const airlines = await airline.find();
        res.status(200).json({
            success: true,
            data: airlines
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch airlines",
            error: err.message
        });
    }
}
exports.getAirline = async (req, res) => {
    try {
        const getAirline = await airline.findById(req.params.Id);
        res.status(200).json({
            success: true,
            data: getAirline
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch airlines",
            error: err.message
        });
    }

}
exports.updateAirline = async (req, res) => {
    try {
        const updateAirline = await airline.findByIdAndUpdate(req.params.Id, { $set: { airline: req.body.name } });
        res.status(200).json({
            success: true,
            data: updateAirline
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch airlines",
            error: err.message
        });
    }

}
exports.createAirline = async (req, res) => {

    try {
        const createairline = new airline({ airline: req.body.name });
        const newairline = await createairline.save();
        res.status(200).json({
            success: true,
            data: newairline
        });
    }
    catch (err) {
        if (err.code === 11000)
            return res.status(500).json({
                success: false,
                message: "Airline Already exist"
            })
        res.status(500).json({
            success: false,
            message: "Failed to add airline",
            error: err.message
        });
    }

}
exports.deleteAirline = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const { Id } = req.params;

        await flightInfo.deleteMany({ airline: Id }, { session });

        const deletedAirline = await airline.findByIdAndDelete(Id, { session });

        if (!deletedAirline) {
            throw new Error("Airline not found");
        }

        await session.commitTransaction();
        session.endSession();

        return res.json({
            success: true,
            message: "Airline and all related flights deleted successfully"
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            success: false,
            message: "Delete failed. No data was changed.",
            error: error.message
        });
    }
};
