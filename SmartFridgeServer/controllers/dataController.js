const connection = require('../config/db');
//const authService = require('../services/authService');

exports.insertData = (req, res) => {
  const data = req.body;
  const query = 'INSERT INTO documents SET ?';

  connection.query(query, data, (insertErr, result) => {
    if (insertErr) {
      console.error(insertErr);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
};

exports.fetchData = async (req, res) => {
  // Fetch data from your database...
  const data = await fetchDataFromDatabase();
  res.json(data);
};

// 카카오 로그인
exports.kakaoLogin = async (req, res) => {
  try {
    const token = req.body.token; // 클라이언트에서 보낸 카카오 토큰
    const verified = await authService.verifyKakaoToken(token);
    if (verified) {
      // 토큰 검증 성공
      res.status(200).json({ success: true, message: 'Kakao login successful' });
    } else {
      // 토큰 검증 실패
      res.status(401).json({ success: false, message: 'Invalid Kakao token' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 네이버 로그인
exports.naverLogin = async (req, res) => {
  // 비슷한 로직
};

// 구글 로그인
exports.googleLogin = async (req, res) => {
  // 비슷한 로직
};