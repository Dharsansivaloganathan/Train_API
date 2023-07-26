// var express = require('express');
// var router = express.Router();
// const routes = require('../routes.json');

// //console.log(routes);

// router.get('/', function (req, res, next) {
//   const { source, destination, startdate, type } = req.body;
//   const matchingRoutes = routes.filter(route => {
//     return route.startCity === source && route.destination === destination && route.date === startdate;
//   });
//   if (matchingRoutes.length == 0) {

//     res.status(200).send("No trains Found");
//   }
//   else {
//     res.status(200).json(matchingRoutes);
//   }
// });

// module.exports = router;

// const express = require("express");
// const {
//   accessChat,
//   fetchChats,
//   createGroupChat,
//   removeFromGroup,
//   addToGroup,
//   renameGroup,
// } = require("../controllers/chatController");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

// module.exports = router;
