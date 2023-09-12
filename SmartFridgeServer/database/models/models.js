const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

// User 모델 정의
class User extends Model {}
User.init({
  user_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: DataTypes.STRING(50),
  name: DataTypes.STRING(20),
  nickname: DataTypes.STRING(20),
  phone: DataTypes.STRING(20),
  gender: DataTypes.STRING(10),
  age_range: DataTypes.STRING(10),
  registered_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  user_status: {
    type: DataTypes.CHAR(1),
    defaultValue: 'Y',
    allowNull: false
  },
  user_type: {
    type: DataTypes.STRING(5),
    defaultValue: 'u',
    allowNull: false
  },
  email_verification: DataTypes.TINYINT,
  picture: DataTypes.STRING(255)
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user',
  timestamps: false
});


// Fridge 모델 정의
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


// Item 모델 정의
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

// Associations
// Add this to your User model definition
User.associate = function(models) {
    console.log("User.associate called"); 
    User.hasMany(models.Fridge, { foreignKey: 'user_no' });
    User.hasMany(models.Item, { foreignKey: 'user_no' });
};

// If items are related to fridges via fridge_no, then it should look like this
Fridge.associate = function(models) {
    console.log("Fridge.associate called"); 
    Fridge.belongsTo(models.User, { foreignKey: 'user_no' });
    Fridge.hasMany(models.Item, { foreignKey: 'fridge_no' });  // <-- Note the change here
};

Item.associate = function(models) {
    console.log("Item.associate called"); 
    Item.belongsTo(models.User, { foreignKey: 'user_no' });
    Item.belongsTo(models.Fridge, { foreignKey: 'user_no' });
};

module.exports = {
    User,
    Fridge,
    Item
};
