const flights = require('../model/flightInfo');

exports.getAllFlights = async (req, res) => {
    const { from, to, date, airline, minPrice, maxPrice, status } = req.query;

    try {


        let results = await flights.find();

        //console.log(results);
        if (from) results = results.filter(f => f.departure.city.toLowerCase() === from.toLowerCase());

        if (to) results = results.filter(f => f.arrival.city.toLowerCase() === to.toLowerCase());
        if (date) results = results.filter(f => new Date(f.departure.scheduledTime).toISOString().split('T')[0] === date);
        if (airline) results = results.filter(f => f.airline.toLowerCase() === airline.toLowerCase());
        if (minPrice) results = results.filter(f => f.price >= Number(minPrice));
        if (maxPrice) results = results.filter(f => f.price <= Number(maxPrice));
        if (status) results = results.filter(f => f.status.toLowerCase() === status.toLowerCase());

        console.log(results);
        res.status(200).json(results);

    } catch (e) {

    }


}


