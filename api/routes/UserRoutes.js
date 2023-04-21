const express = require("express");
const { registerUser, authUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const {
  findTickets,
  bookTickets,
  myBookings,
} = require("../controllers/ticketController");
const router = express.Router();

router.route("/signup").post(registerUser);
router.post("/login", authUser);
router
  .route("/tickets")
  .post(protect, findTickets, bookTickets)
  .get(protect, myBookings);
//router.route("/myBookings").get(protect, );
module.exports = router;
