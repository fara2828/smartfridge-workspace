const mysql = require('mysql');
const db = require('../config/db');

// Google 로그인 정보 저장
exports.saveGoogleUser = (req, res) => {
  const userInfo = req.body;
  
  const query = 'INSERT INTO users SET ?';
  db.query(query, userInfo, (err, result) => {
    if (err) {
      // 이미 존재하는 이메일 처리, 기타 에러 처리
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'User saved', result });
  });
};

// Google 로그인 정보 불러오기
exports.getGoogleUser = (req, res) => {
  const email = req.params.email;
  
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};
