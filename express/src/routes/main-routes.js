const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main-controller");
const path = require("path");
//Para tomar files y almacenarlos
const multer = require("multer");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/imagenes"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
//ejecuto la callback y le paso sin ningun error(null) el nombre del archivo
//el path.extname lo que hace es devolver la extensión desde el ultimo punto(si es un string jpg devuelve solo jpg, si no tiene extención devuelve un string vacío)
const uploader = multer({ storage });

//////////////////////VISUALIZAR LAS PAGINAS PEDIDAS////////////////////////

// router para index
router.get("/", mainController.index);

module.exports = router;
