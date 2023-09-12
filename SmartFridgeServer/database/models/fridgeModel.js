const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
class Fridge extends Model {}

Fridge.init({
    fridge_no: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_no: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user', // Assuming the user model table name is 'user'
            key: 'user_no'
        }
    },
    fridge_name: {
        type: DataTypes.STRING(100)
    },
    status: {
        type: DataTypes.CHAR(1),
        defaultValue: 'y'
    }
}, {
    sequelize, // Sequelize instance
    modelName: 'Fridge',
    tableName: 'fridge',
    timestamps: false // Optional: if you don't want the createdAt and updatedAt fields
});

Fridge.associate = function(models) {
    Fridge.belongsTo(models.User, { foreignKey: 'user_no' });
    Fridge.hasMany(models.Item, { foreignKey: 'user_no' });
  };

module.exports = Fridge;
