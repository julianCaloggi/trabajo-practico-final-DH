const express = require("express");
const router = express.Router();
const eventController = require("../controllerAPI/eventController");

router.get("/events", eventController.list);
router.post("/events", eventController.create);
router.get("/events/:id", eventController.detail);
router.delete("/events/:id", eventController.destroy);

module.exports = router;
