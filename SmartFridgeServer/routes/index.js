const express = require('express');


const router = express.Router();
const dataController = require('../controllers/dataController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');



router.get('/', (req, res) => {
  res.send('smartfridge server is running!');
});

router.post('/data', dataController.insertData);
router.get('/api/data', dataController.fetchData);
router.post('/login', userController.login);
router.post('/addItem', itemController.addItem);

//router.get('/login', kakaoController.loading);
// router.get('/login', kakaoController.login)




// const textMiddleware = (req, res, next) => {
//   let data = '';
//   req.on('data', chunk => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     req.body = data;
//     next();
//   });
// };

//  router.get('/login', textMiddleware, kakaoController.login)


// 새로 추가한 라우터 설정
router.post('/googleUser', authController.saveGoogleUser);
router.get('/googleUser/:email', authController.getGoogleUser);


module.exports = router;
