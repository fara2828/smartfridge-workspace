const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db'); // 위에서 생성한 sequelize 인스턴스를 가져옴

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



module.exports = User;