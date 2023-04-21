const asyncHandler = require("express-async-handler");
const { flightsData } = require("../models/flightModel");
const bookings = [];
const findTickets = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  const { startCity, destination, date, flightType, noofTickets } = req.query;
  const ticketResult = await flightsData.find({
    startCity,
    destination,
    date,
    flightType,
  });
  if (ticketResult.length) {
    const filteredTickets = ticketResult.filter(
      (ticket) => ticket.availableSeats >= parseInt(noofTickets)
    );
    if (filteredTickets.length) {
      req.filteredTickets = filteredTickets;
      next();
    } else {
      res.status(404).send("No flights found.");
    }
  } else {
    res.status(404).send("No flights found.");
  }
});

const bookTickets = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { ticketsToBook } = req.body;

  for (const ticket of ticketsToBook) {
    const { flightNumber, noofTickets } = ticket;

    // Find the flight document from the filtered tickets array
    const flight = req.filteredTickets.find(
      (flight) => flight.flightNumber === flightNumber
    );
    console.log(flight);
    if (flight && parseInt(flight.availableSeats) >= parseInt(noofTickets)) {
      const updatedFlight = await flightsData.findOneAndUpdate(
        { flightNumber: flightNumber },
        {
          availableSeats:
            parseInt(flight.availableSeats) - parseInt(noofTickets),
        },
        { new: true }
      );
      delete updatedFlight[("totalSeats", "availableSeats")];
      updatedFlight.noOfBookedSeats = noofTickets;
      bookings.push(updatedFlight);
    }
  }

  if (bookings.length) {
    //next();
    res.status(200).send("Tickets Booked");
  } else {
    res.status(400).send("Failed to book tickets.");
  }
});

const myBookings = asyncHandler(async (req, res) => {
  console.log(req.body);
  // const { uname, email } = req.body;
  // const bookedTickets = bookings.filter(
  //     (name) => ticket.name ===
  //   );

  if (bookings.length) {
    res.status(200).json(bookings);
  } else {
    res.status(200).send("No reserved Tickets to show");
  }
});

module.exports = { findTickets, bookTickets, myBookings };
