const express = require("express");
const { authAdmin } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { addFlights, deleteFlight } = require("../controllers/flightController");
const router = express.Router();

router.route("/login").post(authAdmin);
router.route("/portal").put(protect, addFlights).delete(protect, deleteFlight);
// router.post('/login', authUser)
// router.post('/login/admin', authAdmin)
module.exports = router;
