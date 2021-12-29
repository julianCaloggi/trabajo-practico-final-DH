const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
    "Location",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      locations: DataTypes.STRING,
    },
    {
      tableName: "locations",
      timestamps: false,
    }
  );
  model.associate = function (models) {
    model.belongsTo(models.Province, {
      as: "province",
      foreignKey: "idProvince",
    });
    model.hasMany(models.Event, {
      as: "events",
      foreignKey: "idLocations",
    });
  };
  return model;
};
