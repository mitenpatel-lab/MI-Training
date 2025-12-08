const flights = require('../model/flightInfo');
const flightService = require('../services/flightService');

exports.getAllFlights = async (req, res) => {
    try {
        debugger
        const data = await flightService.getAllFlights(req.query);
        if (Object.keys(req.query).length == 0) {
            res.status(200).json({
                success: true,
                data: data.results
            });
        } else {
            res.status(200).json({
                success: true,
                data: data.flights,
                airlines: data.airlines,
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getFlightById = async (req, res) => {
    try {

        const results = await flights.findById(req.params.Id)
            .populate("airline");
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json(e.message);
    }
}
exports.updateFlightStatus = async (req, res) => {

    try {
        let update = await flightService.updateFlightStatus(req.params.Id, req.body.status);
        if (update) {
            return res.status(200).json(update);
        }
        return res.status(500).json(update);
    } catch (err) {

    }

}
exports.deleteFlight = async (req, res) => {
    try {
        const id = req.params.Id;
        const deleted = await flightService.deleteFlight(id);
        if (!deleted) {
            return res.status(404).json({ message: "Flight not found" });
        }
        return res.status(200).json({ message: "Deleted successfully", status: 200 });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

exports.createFlight = async (req, res) => {

    try {
        const flight = await flightService.createFlight(req.body);
        return res.status(201).json({
            success: true,
            message: "Flight created successfully",
            data: flight,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to create flight",
            error: err.message,
        });
    }

}

exports.updateFlight = async (req, res) => {
    const id = req.params.Id;
    try {
        const updatedFlight = await flightService.updateFlightById(id, req.body);
        res.status(200).json({
            success: true,
            data: updatedFlight
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update flight: " + err.message,
            error: err.message
        });
    }
};