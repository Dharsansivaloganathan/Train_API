const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    CompanyName: {
      type: String,
    },
    flightType: {
      type: String,
    },
    flightNumber: {
      type: String,
    },
    startCity: {
      type: String,
    },
    destination: {
      type: String,
    },
    totalSeats: {
      type: String,
    },
    availableSeats: {
      type: String,
    },
    pricePerSeat: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    collection: "FlightTimings",
  }
);

const flightsData = mongoose.model("flightsData", flightSchema);

module.exports = { flightsData };
