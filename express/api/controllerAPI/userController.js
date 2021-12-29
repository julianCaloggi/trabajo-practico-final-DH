const { User } = require("../../src/database/models");
const PAGE_SIZE = 10;

module.exports = {
  list: async (req, res) => {
    const page = Number(req.query.page) || 0;
    const offset = page * PAGE_SIZE;
    let { count, rows } = await User.findAndCountAll({
      order: [["id", "ASC"]],
      offset: offset,
      limit: PAGE_SIZE,
    });

    rows.map((user) => {
      delete user.dataValues.user_password;
      user.dataValues.Url = "http://localhost:3000/api/users/" + user.id;
      user.dataValues.AvatarUrl =
        "http://localhost:3000/imagenes/Users/" + user.avatar;
    });

    res.json({
      meta: {
        status: 200,
        total: count,
        page: page,
        pageSize: PAGE_SIZE,
        nextUrl:
          offset + PAGE_SIZE < count
            ? `http://localhost:3000/api/users?page=${page + 1}`
            : null,
        prevUrl:
          page > 0 ? `http://localhost:3000/api/users?page=${page - 1}` : null,
      },
      data: rows,
    });
    // res.send("API DETAIL")
  },
  detail: async (req, res) => {
    let user = await User.findByPk(req.params.id);
    if (user) {
      delete user.dataValues.user_password;
      user.dataValues.AvatarUrl =
        "http://localhost:3000/imagenes/Users/" + user.avatar;
      res.json({
        meta: {
          status: 200,
          url: "http://localhost:3000/api/users/" + req.params.id,
        },
        data: user,
      });
    } else {
      res.json({
        meta: {
          status: 404,
          url: "htpp://localhost:3000/api/users/" + req.params.id,
        },
        data: `No se encontró el usuario con id: ${req.params.id}`,
      });
    }
    // res.send("API DETAIL");
  },
  create: async (req, res) => {
    const newUser = await User.create(req.body);
    res.send({
      meta: {
        status: 201,
        url: "api/users",
      },
      data: newUser,
    });
    // res.send("Se está creando un usuario");
  },
  destroy: async (req, res) => {
    const deleteUser = await User.destroy({
      where: { id: req.params.id },
    });
    res.send("Se eliminó el usuario");
  },
};
