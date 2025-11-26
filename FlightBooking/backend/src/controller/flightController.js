const flights = require('../model/flightInfo');
const airlines = require('../model/airlines');
exports.getAllFlights = async (req, res) => {
    const { from, to, date, airline, minPrice, maxPrice } = req.query;

    console.log(date);
    try {
        let results = await flights.find().populate("airline");
        if (Object.keys(req.query).length == 0) return res.status(200).json(results);

        if (from) results = results.filter(f => f.departure.city.toLowerCase() === from.toLowerCase());
        //console.log("from filter " + results);

        if (to) results = results.filter(f => f.arrival.city.toLowerCase() === to.toLowerCase());
        //console.log("to filter " + results);
        if (date) results = results.filter(f => new Date(f.departure.scheduledTime).toLocaleDateString("en-CA") === date);
        // console.log("date filter " + results);

        if (airline) results = results.filter(f => f.airline.airline.toLowerCase() === airline.toLowerCase());
        //log("airline filter " + results);

        if (minPrice) results = results.filter(f => f.price.min >= Number(minPrice));
        //log("min filter " + results);

        if (maxPrice) results = results.filter(f => f.price.max <= Number(maxPrice));
        //log("max filter " + results);

        if (!from || !to || !minPrice || !maxPrice)
            results = results.filter(f => Number(f.status) === 1)

        console.log(results);
        let air = await airlines.find();
        console.log(airline);
        res.status(200).json({ data: results, airline: air });


    } catch (e) {
        res.status(500).json(e.message);

    }


}
exports.getFlightById = async (req, res) => {
    try {

        const results = await flights.findById(req.params.Id)
            .populate("airline");
        console.log(results);
        let airline = await airlines.find();
        console.log(airline);
        res.status(200).json({ data: results, airline: airline });
    } catch (e) {
        res.status(500).json(e.message);

    }


}
exports.updateFlightStatus = async (req, res) => {

    try {
        let update = await flights.findByIdAndUpdate(req.params.Id, { status: Number(req.body.status) });

        if (update) {
            //log(update);
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
            //log(updateflights);
            return res.status(200).json({ message: "deleted successfully", status: 200 });
        }

    } catch (err) {
        return res.status(404).json({ message: err.message });

    }

}



