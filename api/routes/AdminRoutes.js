const express = require("express");
const { authAdmin } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { addtrains, deletetrain } = require("../controllers/trainController");
const router = express.Router();

router.route("/login").post(authAdmin);
router.route("/portal").put(protect, addtrains).delete(protect, deletetrain);
// router.post('/login', authUser)
// router.post('/login/admin', authAdmin)
module.exports = router;
