const { body } = require("express-validator");

//la validaciones del usuario que debe cumplir para poder susbcribirse a la pagina
module.exports = [
  body("first_name").notEmpty().withMessage("Ingrese su nombre por favor"),

  body("last_name").notEmpty().withMessage("Ingrese un apellido por favor"),

  body("birth_date").notEmpty().withMessage("Ingrese su fecha de nacimiento"),

  body("email")
    .notEmpty()
    .withMessage("Escriba un email por favor")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo valido"),

  body("idCategorie").isIn(["1", "2"]),
];
