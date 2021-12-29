const { DataTypes, TIME } = require("Sequelize");

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // created_at: DataTypes.timestams esta mal,
      // updated_at: DataTypes.timestamps,
      // deleted_at: DataTypes.timestamps,
      eventOpen: DataTypes.INTEGER,
      event_name: DataTypes.STRING,
      event_address: DataTypes.STRING,
      event_date: DataTypes.DATEONLY,
      start_time: DataTypes.TIME,
      end_time: DataTypes.TIME,
      price: DataTypes.DECIMAL,
      event_description: DataTypes.STRING,
      more_info: DataTypes.STRING,
      banner: DataTypes.STRING,
    },
    {
      tableName: "events",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      // deletedAt: null,
      // paranoid: true /*por ahora -- ver la configuracion del underscored: true*/,
    }
  );

  model.associate = function (models) {
    model.belongsTo(models.Location, {
      as: "location",
      foreignKey: "idLocations",
    });

    model.belongsTo(models.User, {
      as: "user",
      foreignKey: "idUser",
    });

    model.belongsToMany(models.User, {
      as: "sales",
      through: "Sale",
      foreignKey: "idEvent",
      otherKey: "idUser",
      timestamps: false,
    });
  };

  return model;
};
