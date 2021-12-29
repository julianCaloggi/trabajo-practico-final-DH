const express = require("express");
const router = express.Router();
const eventRoutes = require("./eventRoutes");
const userRoutes = require("./userRoutes");

router.use(eventRoutes);
router.use(userRoutes);

module.exports = router;
