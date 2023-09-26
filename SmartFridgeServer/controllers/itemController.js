const { User, Fridge, Item } = require('../database/models');

// 아이템 추가
const addItem = async (req, res) => {
  console.log('additem!');
  try {
    const {
      userNo,
      selectedFridge,
      imageUri,
      category,
      count,
      division,
      purchaseDate,
      expiryDate,
      store,
      memo,
      barcode,
      product
    } = req.body;
    console.log("Request Body: ", req.body);
    const newItem = await Item.create({
      user_no: userNo,
      fridge_no: selectedFridge,
      item_name: product,
      storage_type: division,
      exp_date: expiryDate,
      memo,
      barcode,
      registered_date: purchaseDate,
      status: 'y',
      item_category: category
    });
    console.log("New Item: ", newItem);
    if (newItem) {
      res.status(201).json({
        success: true,
        message: '아이템이 성공적으로 저장되었습니다.',
        item: newItem
      });
    } else {
      res.status(500).json({
        success: false,
        message: '아이템 저장에 실패했습니다.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '서버 오류: ' + error.message
    });
  }
};

// 아이템 수정
const updateItem = async (req, res) => {
  try {
    const { item_no } = req.params;
    const { item_name, storage_type, exp_date, item_category } = req.body;
    
    const [updated] = await Item.update({
      item_name,
      storage_type,
      exp_date,
      item_category
    }, {
      where: { item_no }
    });
    
    if (updated) {
      const updatedItem = await Item.findOne({ where: { item_no } });
      return res.status(200).json({ item: updatedItem });
    }
    throw new Error('Item not found');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 여기에 더 많은 함수를 정의할 수 있습니다.

module.exports = {
  addItem,
  updateItem,
  
};
