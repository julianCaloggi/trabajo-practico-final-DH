const { body } = require("express-validator");

const loginValidations = [
  body("email")
    .notEmpty()
    .withMessage("Escriba un email por favor")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo valido"),
  body("user_password")
    .notEmpty()
    .withMessage("Ingrese una contrseña por favor")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener un minimo de ocho caracteres"),
];

module.exports = loginValidations;
