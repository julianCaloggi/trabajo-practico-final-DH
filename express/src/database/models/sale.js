const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
    "Sale",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date_sale: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
    },
    {
      tableName: "sales",
      timestamps: false,
    }
  );
  return model;
};
