const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");
const eventValidations = require("../validations/event-form-validation");
const uploader = require("../middlewares/event-multer");

router.get("/", eventController.index);

// router para CreateEvent
router.get("/CrearEvento", eventController.creatEvent);
router.post(
  "/",
  uploader.single("banner"),
  eventValidations,
  eventController.storeEvent
);

//router para buscar
router.get("/buscar", eventController.search);
//router para EventDetail
router.get("/:id", eventController.detail);
//routes para EditEvent
router.get("/:id/editar", eventController.edit);
//falta router.put para editar
router.put("/:id", uploader.single("banner"), eventController.update);
//router para borrar
router.delete("/:id", eventController.delete);
// router para EventCart
router.get("/Carrito/:id", eventController.carrito);

module.exports = router;
