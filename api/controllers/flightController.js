const asyncHandler = require("express-async-handler");
const { flightsData } = require("../models/flightModel");

const addFlights = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    CompanyName,
    startCity,
    destination,
    date,
    flightType,
    totalSeats,
    availableSeats,
    pricePerSeat,
    flightNumber,
  } = req.body;
  const addedFlight = await flightsData.create({
    CompanyName,
    startCity,
    destination,
    date,
    flightType,
    totalSeats,
    availableSeats,
    pricePerSeat,
    flightNumber,
  });
  if (addedFlight) {
    res.status(200).json(addedFlight);
  } else {
    res.status(200).send("No flights added");
  }
});

const deleteFlight = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    CompanyName,
    startCity,
    destination,
    date,
    flightType,
    totalSeats,
    availableSeats,
    pricePerSeat,
    flightNumber,
  } = req.body;
  const deletedFlight = await flightsData.deleteOne({
    CompanyName,
    startCity,
    destination,
    date,
    flightType,
    totalSeats,
    availableSeats,
    pricePerSeat,
    flightNumber,
  });

  if (deletedFlight) {
    res.status(200).json(deletedFlight);
  } else {
    res.status(404).send("Flight not found");
  }
});

module.exports = { addFlights, deleteFlight };
