const flights = require('../model/flightInfo');
const airlines = require('../model/airlines');
exports.getAllFlights = async (req, res) => {
    const { from, to, date, airline, minPrice, maxPrice } = req.query;

    try {
        let results = await flights.find().populate("airline");
        if (Object.keys(req.query).length == 0) {
            return res.status(200).json(results);
        }

        if (from) results = results.filter(f => f.departure.city.toLowerCase() === from.toLowerCase());
        if (to) results = results.filter(f => f.arrival.city.toLowerCase() === to.toLowerCase());
        if (date) results = results.filter(f => new Date(f.departure.scheduledTime).toLocaleDateString("en-CA") === date);
        if (airline) results = results.filter(f => f.airline._id.toString() === airline);
        if (minPrice) results = results.filter(f => f.price.min >= Number(minPrice));
        if (maxPrice) results = results.filter(f => f.price.max <= Number(maxPrice));
        results = results.filter(f => Number(f.status) === 1)
        const air = await airlines.find();
        res.status(200).json({ data: results, airline: air });

    } catch (e) {
        res.status(500).json(e.message);
    }

}
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
        let update = await flights.findByIdAndUpdate(req.params.Id, { status: Number(req.body.status) });

        if (update) {
            return res.status(200).json(update);
        }
        return res.status(404).json(update);

    } catch (err) {

    }

}
exports.deleteFlight = async (req, res) => {

    try {
        let updateflights = await flights.findByIdAndDelete(req.params.Id);

        if (updateflights) {
            return res.status(200).json({ message: "deleted successfully", status: 200 });
        }

    } catch (err) {
        return res.status(404).json({ message: err.message });

    }

}

exports.createFlight = async (req, res) => {

    try {
        const createflight = new flights(req.body);
        const newflight = await createflight.save();
        res.status(200).json({
            success: true,
            data: newflight
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add airline" + err.message,
            error: err.message
        });
    }

}
exports.updateFlight = async (req, res) => {

    const id = req.params.Id;
    try {
        const updateflight = await flights.updateOne({ _id: id }, { $set: req.body });
        res.status(200).json({
            success: true,
            data: updateflight
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add airline" + err.message,
            error: err.message
        });
    }

}
