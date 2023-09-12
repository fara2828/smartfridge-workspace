const User = require('../models/fridgeModel');

const createTable = async () => {
  try {
    await User.sync({ force: false });  // force: false는 테이블이 이미 존재하면 덮어쓰지 않습니다.
    console.log('fridgetable has been created.');
  } catch (error) {
    console.error('fridge table could not be created:', error);
  }
};

createTable();
