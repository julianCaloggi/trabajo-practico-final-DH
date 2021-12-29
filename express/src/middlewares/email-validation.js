const { body } = require("express-validator");

// const userServices = require("../services/users-services");
const db = require("../database/models");

module.exports = async function emailValidation(req, res, next) {
  let userInDB = await db.User.findOne({ where: { email: req.body.email } });
  if (userInDB) {
    return res.render("users/register", {
      errors: {
        email: {
          msg: "Este email ya está registrado",
        },
      },
      oldData: req.body,
    });
  } else {
    next();
  }
};
