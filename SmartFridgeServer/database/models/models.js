const { Sequelize, Model, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const configPath = path.resolve(__dirname, '../../config/config.json');
const config = require(configPath)[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// User 모델 정의
class User extends Model {}
User.init({
  user_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  id: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  nickname: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  age_range: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
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
  email_verification: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  picture: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
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
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_no'
    }
  },
  fridge_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'fridge',
      key: 'fridge_no'
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
  storage_type: {
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
  image_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'image',
      key: 'photo_id'
    }
  },
  registered_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.CHAR(1),
    defaultValue: 'y',
    allowNull: false
  },
  item_category: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 'category',
      key: 'category_name'
    }
  }
}, {
  sequelize,
  modelName: 'Item',
  tableName: 'item',
  timestamps: false
});



// Category 모델 정의
class Category extends Model {}
Category.init({
  category_no: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'category',
  timestamps: false
});

// Image 모델 정의
class Image extends Model {}
Image.init({
  photo_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  file_path: DataTypes.STRING(255),
  file_name: DataTypes.STRING(255),
  reference_id: DataTypes.INTEGER,
  reference_type: DataTypes.STRING(50)
}, {
  sequelize,
  modelName: 'Image',
  tableName: 'image',
  timestamps: false
});


// Associations
User.hasMany(Fridge, { foreignKey: 'user_no', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Item, { foreignKey: 'user_no', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Fridge.belongsTo(User, { foreignKey: 'user_no', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Fridge.hasMany(Item, { foreignKey: 'fridge_no', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Item.belongsTo(User, { foreignKey: 'user_no', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Item.belongsTo(Fridge, { foreignKey: 'fridge_no', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Item.belongsTo(Category, { foreignKey: 'item_category', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Item.belongsTo(Image, { foreignKey: 'image_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

Category.hasMany(Item, { foreignKey: 'item_category', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

Image.hasMany(Item, { foreignKey: 'image_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });


module.exports = {
    User,
    Fridge,
    Item,
    Category, // Newly added
    Image // Newly added
  };
