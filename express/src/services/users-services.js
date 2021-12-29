const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
let userFilePath = path.join(__dirname, "../data/userDataBase.json");
let users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

const userServices = {
  findAll: function () {
    return users;
  },

  filterByID(id) {
    const user = users.filter((user) => {
      return user.id == id;
    });
    return user;
  },

  findById(id) {
    const user = users.find((user) => {
      return user.id == id;
    });
    return user;
  },

  findByEmail(payload) {
    const user = users.find((user) => {
      return user.email == payload;
    });
    return user;
  },

  createUser(payload, img) {
    const lastUser = users[users.length - 1];
    const biggesUserId = users.length > 0 ? lastUser.id : 1;
    const user = {
      id: biggesUserId + 1,
      ...payload,
      password: bcryptjs.hashSync(payload.password, 10),
      Repeat_password: null,
      avatar: img ? img.filename : "avatar3.png",
    };
    users.push(user);
    this.save();
    return user;
  },

  deleteUser(payload) {
    const userToDelete = this.filterByID(payload);
    users.pop(userToDelete);
    this.save();
  },
  // deleteAvatar(payload) {
  //   let avatarToDelete = this.findByID(payload);
  //   console.log(avatarToDelete);
  //   fs.unlinkSync(
  //     path.join(
  //       __dirname,
  //       "../../public/imagenes/Users/" + avatarToDelete.avatar
  //     )
  //   );
  // },
  save() {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, "  "));
  },
};
module.exports = userServices;
