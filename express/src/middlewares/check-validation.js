const { validationResult } = require("express-validator");
//validaciones del usuario al ingresar informacion
module.exports = function checkValidation(req, res, next) {
  const resultValidation = validationResult(req);
  if (resultValidation.errors.length > 0) {
    return res.render("users/register", {
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  } else {
    next();
  }
};
