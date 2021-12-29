const { body } = require("express-validator");

//la validaciones del usuario que debe cumplir para poder susbcribirse a la pagina
module.exports = [
  body("first_name")
    .notEmpty()
    .withMessage("Ingrese su nombre por favor")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener un minimo de dos caracteres"),

  body("last_name")
    .notEmpty()
    .withMessage("Ingrese un apellido por favor")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener un minimo de dos caracteres"),

  body("birth_date").notEmpty().withMessage("Ingrese su fecha de nacimiento"),

  body("email")
    .notEmpty()
    .withMessage("Escriba un email por favor")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo valido"),

  body("idCategorie").isIn(["1", "2"]),

  body("user_password")
    .notEmpty()
    .withMessage("Ingrese una contrseña por favor")
    .bail()
    .isStrongPassword()
    .withMessage("La contraseña es muy débil")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener un minimo de ocho caracteres")
    .custom((value, { req }) => {
      if (value != req.body.Repeat_password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
];
