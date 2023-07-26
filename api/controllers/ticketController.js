const asyncHandler = require("express-async-handler");
const { trainsData } = require("../models/trainModel");
const bookings = [];
const findTickets = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  const { startCity, destination, date, trainType, noofTickets } = req.query;
  const ticketResult = await trainsData.find({
    startCity,
    destination,
    date,
    trainType,
  });
  console.log(ticketResult);
  if (ticketResult.length) {
    const filteredTickets = ticketResult.filter(
      (ticket) => ticket.availableSeats >= parseInt(noofTickets)
    );
    if (filteredTickets.length) {
      req.filteredTickets = filteredTickets;
      res.json(req.filteredTickets);
    } else {
      res.status(404).send("No trains found.");
    }
  } else {
    res.status(404).send("No trains found.");
  }
});

const bookTickets = asyncHandler(async (req, res) => {
  console.log(req.body);
  const ticketsToBook = req.body;
  console.log(ticketsToBook);
  for (const ticket of ticketsToBook) {
    const { trainNumber, noofTickets } = ticket;
    const train = req.filteredTickets.find(
      (train) => train.trainNumber === trainNumber
    );
    console.log(train);
    if (train && parseInt(train.availableSeats) >= parseInt(noofTickets)) {
      const updatedtrain = await trainsData.findOneAndUpdate(
        { trainNumber: trainNumber },
        {
          availableSeats:
            parseInt(train.availableSeats) - parseInt(noofTickets),
        },
        { new: true }
      );
      delete updatedtrain[("totalSeats", "availableSeats")];
      updatedtrain.noOfBookedSeats = noofTickets;
      bookings.push(updatedtrain);
    }
  }

  if (bookings.length) {
    res.status(200).send("Tickets Booked");
  } else {
    res.status(400).send("Failed to book tickets.");
  }
});

const myBookings = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (bookings.length) {
    res.status(200).json(bookings);
  } else {
    res.status(200).send("No reserved Tickets to show");
  }
});

module.exports = { findTickets, bookTickets, myBookings };
