const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
class Item extends Model {}

Item.init({
    item_no: {
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
    item_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    barcode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    condition: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: 'fridge / freezer / room'
    },
    exp_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '제품명+유통기한: 복합키 (unique)'
    },
    memo: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    item_photo: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    enroll_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.CHAR(1),
        defaultValue: 'y'
    },
    item_category: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize, // Sequelize instance
    modelName: 'Item',
    tableName: 'item',
    timestamps: false // Optional: if you don't want the createdAt and updatedAt fields
});

Item.associate = function(models) {
    Item.belongsTo(models.User, { foreignKey: 'user_no' });
    Item.belongsTo(models.Fridge, { foreignKey: 'user_no' });
  };

module.exports = Item;
