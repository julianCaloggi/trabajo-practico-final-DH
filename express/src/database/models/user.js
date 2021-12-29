const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      birth_date: DataTypes.DATEONLY,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      user_password: DataTypes.STRING,
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  model.associate = function (models) {
    model.belongsToMany(models.Categorie, {
      as: "categories",
      through: "user_categorie",
      foreignKey: "idUser",
      otherKey: "idCategorie",
      timestamps: false,
    });

    model.hasMany(models.Event, {
      as: "events",
      foreignKey: "idUser",
    });

    model.belongsToMany(models.Event, {
      as: "sales",
      through: "Sale",
      foreignKey: "idUser",
      otherKey: "idEvent",
      timestamps: false,
    });
  };
  return model;
};
