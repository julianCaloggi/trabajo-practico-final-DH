const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
    "Categorie",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categorie: DataTypes.STRING,
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );

  model.associate = function (models) {
    model.belongsToMany(models.User, {
      as: "users",
      through: "user_categorie",
      foreignKey: "idCategorie",
      otherKey: "idUser",
      timestamps: false,
    });
  };
  return model;
};
