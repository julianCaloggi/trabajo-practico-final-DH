const { body } = require("express-validator");

//la validaciones del usuario que debe cumplir para poder susbcribirse a la pagina
module.exports = [
  body("user_password")
    .notEmpty()
    .withMessage("Ingrese una contrseña por favor")
    .bail()
    .isStrongPassword()
    .withMessage("La contraseña es muy débil")
    .bail()
    .custom((value, { req }) => {
      if (value != req.body.Repeat_password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
];
