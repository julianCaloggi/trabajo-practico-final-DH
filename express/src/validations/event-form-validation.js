const { body } = require("express-validator");

const eventValidations = [
  body("event_name").notEmpty().withMessage("ingrese el nombre del evento"),

  body("event_address")
    .notEmpty()
    .withMessage("Ingrese la direccion del evento"),
  //agregar validacion de provincia y location
  body("idProvince").notEmpty().withMessage("Debe Seleccionar una provincia"),

  body("idLocations").notEmpty().withMessage("Debe Seleccionar una localidad"),

  body("event_date").notEmpty().withMessage("Ingrese la fecha del evento"),

  body("start_time")
    .notEmpty()
    .withMessage("Ingrese la hora de inicio del evento"),

  body("end_time").notEmpty().withMessage("Ingrese la hora de finalizacion"),

  body("price").notEmpty().withMessage("Ingrese el precio de entrada"),

  body("event_description")
    .notEmpty()
    .withMessage("Ingrese una descripcion del evento"),
];

module.exports = eventValidations;
