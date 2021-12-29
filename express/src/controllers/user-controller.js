const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");

//--------------DataBase.Json---------------------------//
const userServices = require("../services/users-services");
const db = require("../database/models");

module.exports = {
  //////////////////////REGISTRACION Y VALIDACION DE DATOS (BACK)////////////////////////
  register: (req, res) => {
    res.render("users/register");
  },

  createUser: async (req, res) => {
    //check email
    //let userInDB = userServices.findByEmail(req.body.email);

    userInDB = await db.User.findOne({ where: { email: req.body.email } });
    if (userInDB) {
      return res.render("users/register", {
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }

    const user = await db.User.create(
      //en la tabla user_categorie no suma el iduser
      {
        ...req.body,
        user_password: bcryptjs.hashSync(req.body.user_password, 10),
        avatar: req.file ? req.file.filename : "avatar3.jpg", //img?? o avatar.filename
      }
    );
    await user.setCategories(req.body.idCategorie);

    res.redirect("./Login"); // falta el html
  },

  login: (req, res) => {
    res.render("users/login");
  },

  loginProcess: async (req, res) => {
    const userToLogin = await db.User.findOne({
      where: { email: req.body.email },
    });
    //si hay usuario con mail
    if (userToLogin) {
      //chequea la contraseña
      const isOkThePassword = bcryptjs.compareSync(
        req.body.user_password,
        userToLogin.user_password
      );

      //si la contraseña está bien redirigilo a su perfil
      if (isOkThePassword) {
        // delete userToLogin.password;
        // delete userToLogin.Repeat_Password;
        req.session.userLogged = userToLogin;

        if (req.body.remember) {
          res.cookie("userEmail", req.body.email, {
            maxAge: 1000 * 60,
          });
        }
        return res.redirect(
          "./" + req.session.userLogged.id /*userToLogin.id*/
        );
      }
      //si la contraseña está mal enviarle mensaje de error en la vista y email renderizado
      return res.render("users/login", {
        errors: {
          user_password: {
            msg: "Las contraseña es incorrecta",
          },
        },
      });
    }
    //si no hay usuario con ese mail, enviarle mensaje de error en la vista
    return res.render("users/login", {
      errors: {
        email: {
          msg: "No se encuentra este email en la base de datos",
        },
      },
    });
  },

  profile: (req, res) => {
    /*const userperfil = userServices.filterByID(req.params.id);
    res.render("users/profile", { userperfil });*/
    return res.render("users/profile2", { user: req.session.userLogged });
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("../Evento");
  },
  delete: (req, res) => {
    // userServices.deleteAvatar(req.body.avatar);
    //userServices.deleteUser(req.body);
    db.User.destroy({
      where: { id: req.params.id },
    });
    res.clearCookie("userEmail");
    req.session.destroy();
    res.redirect("../Evento");
  },
  passwordEdit: (req, res) => {
    return res.render("users/editPassword", { user: req.session.userLogged });
  },

  //chequear UpdatePassword
  updatePassword: async (req, res) => {
    await db.User.update(
      {
        user_password: bcryptjs.hashSync(req.body.user_password, 10),
        // user_password: req.body.user_password,
      },
      { where: { id: req.params.id } }
    );
    return res.redirect("/Usuario/:id");
  },
  editProfile: (req, res) => {
    return res.render("users/editProfile", { user: req.session.userLogged });
  },
  updateProfile: async (req, res) => {
    await db.User.update(
      {
        ...req.body,
        avatar: req.file ? req.file.filename : "avatar3.jpg",
      },
      { where: { id: req.params.id } }
    );
    return res.redirect("/Usuario/:id");
  },
  avatar: async (req, res) => {
    res.render("img");
  },
};
