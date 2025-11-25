const flights = require('../model/flightInfo');

exports.getAllAirlines = async (req, res) => {
    try {
        const airlines = await flights.distinct("airline");

        console.log(airlines);
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