const flights = require('../model/flightInfo');
const airlines = require('../model/airlines');

exports.deleteFlight = async (id) => {
    return await flights.findByIdAndDelete(id);
};

exports.createFlight = async (data) => {
    const flight = new flights(data);
    return await flight.save();
};

exports.getAllFlights = async (filters) => {
    const { from, to, date, airline, minPrice, maxPrice } = filters;
    let results = await flights.find().populate("airline");
    if (Object.keys(filters).length == 0) {
        return { results };
    }

    if (from) results = results.filter(f => f.departure.city.toLowerCase() === from.toLowerCase());

    if (to) results = results.filter(f => f.arrival.city.toLowerCase() === to.toLowerCase());

    if (date) results = results.filter(f => new Date(f.departure.scheduledTime).toLocaleDateString("en-CA") === date);

    if (airline) results = results.filter(f => f.airline._id.toString() === airline);

    if (minPrice) results = results.filter(f => f.price.min >= Number(minPrice));

    if (maxPrice) results = results.filter(f => f.price.max <= Number(maxPrice));
    results = results.filter(f => Number(f.status) === 1)
    const air = await airlines.find();
    return { flights: results, airlines: air };

}

exports.updateFlightStatus = async (id, status) => {
    return await flights.findByIdAndUpdate(id, { status: Number(status) });
};

exports.updateFlightById = async (id, updateData) => {
    return await flights.updateOne({ _id: id }, { $set: updateData });
};