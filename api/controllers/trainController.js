const asyncHandler = require("express-async-handler");
const { trainsData } = require("../models/trainModel");

const addtrains = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    CompanyName,
    startCity,
    destination,
    date,
    trainType,
    totalSeats,
    availableSeats,
    pricePerSeat,
    trainNumber,
  } = req.body;
  const addedtrain = await trainsData.create({
    CompanyName,
    startCity,
    destination,
    date,
    trainType,
    totalSeats,
    availableSeats,
    pricePerSeat,
    trainNumber,
  });
  if (addedtrain) {
    res.status(200).json(addedtrain);
  } else {
    res.status(200).send("No trains added");
  }
});

const deletetrain = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    CompanyName,
    startCity,
    destination,
    date,
    trainType,
    totalSeats,
    availableSeats,
    pricePerSeat,
    trainNumber,
  } = req.body;
  const deletedtrain = await trainsData.deleteOne({
    CompanyName,
    startCity,
    destination,
    date,
    trainType,
    totalSeats,
    availableSeats,
    pricePerSeat,
    trainNumber,
  });

  if (deletedtrain) {
    res.status(200).json(deletedtrain);
  } else {
    res.status(404).send("train not found");
  }
});

module.exports = { addtrains, deletetrain };
