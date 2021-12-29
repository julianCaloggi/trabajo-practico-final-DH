const express = require("express");
const router = express.Router();
const userController = require("../controllerAPI/userController");

router.get("/users", userController.list);
router.post("/users", userController.create);
router.get("/users/:id", userController.detail);
router.delete("/users/:id", userController.destroy);

module.exports = router;
