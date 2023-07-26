const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainSchema = new Schema(
  {
    CompanyName: {
      type: String,
    },
    trainType: {
      type: String,
    },
    trainNumber: {
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
    collection: "trainTimings",
  }
);

const trainsData = mongoose.model("trainsData", trainSchema);

module.exports = { trainsData };
