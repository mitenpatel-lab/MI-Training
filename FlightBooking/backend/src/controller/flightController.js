const flights = require('../model/flightInfo');

exports.getAllFlights = async (req, res) => {
    const { from, to, date, airline, minPrice, maxPrice, status } = req.query;

    try {


        let results = await flights.find();

        if (Object.keys(req.query).length == 0)
            return res.status(200).json(results);

        //console.log(results);
        if (from) results = results.filter(f => f.departure.city.toLowerCase() === from.toLowerCase());

        if (to) results = results.filter(f => f.arrival.city.toLowerCase() === to.toLowerCase());
        if (date) results = results.filter(f => new Date(f.departure.scheduledTime).toISOString().split('T')[0] === date);
        if (airline) results = results.filter(f => f.airline.toLowerCase() === airline.toLowerCase());
        if (minPrice) results = results.filter(f => f.price >= Number(minPrice));
        if (maxPrice) results = results.filter(f => f.price <= Number(maxPrice));
        if (status) results = results.filter(f => f.status.toLowerCase() === status.toLowerCase());
        if (!from || !to || !minPrice || !maxPrice)
            results = results.filter(f => Number(f.status) === 1)

        console.log(results);
        res.status(200).json(results);


    } catch (e) {

    }


}
exports.getFlightById = async (req, res) => {

    try {
        let results = await flights.findById(req.params.Id);
        console.log(results);
        res.status(200).json(results);
    } catch (e) {
        res.status().json(results);

    }


}
exports.updateFlightStatus = async (req, res) => {

    try {
        let update = await flights.findByIdAndUpdate(req.params.Id, { status: Number(req.body.status) });

        if (update) {
            console.log(update);
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
            console.log(updateflights);
            return res.status(200).json({ message: "deleted successfully", status: 200 });
        }

    } catch (err) {
        return res.status(404).json({ message: err.message });

    }

}



