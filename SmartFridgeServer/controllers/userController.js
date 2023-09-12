const {User, Fridge, Item}  = require('../database/models/models');
const { Success, Failure } = require('../types/response');
const path = require('path');
const { sequelize } = require('../config/db');



let fetch;

import('node-fetch').then((module) => {
  fetch = module.default;
}).catch((err) => {
  console.error(err);
});


exports.login = async function (req, res) {
  // 카카오 Oauth에서 넘겨준 body의 acces_token추출
  const { ACCESS_TOKEN } = req.body;
  console.log(ACCESS_TOKEN);
  let kakaoAccountResponse;
  // accessToken으로 카카오 유저정보 요청하기
  try {
    const url = 'https://kapi.kakao.com/v2/user/me';
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      kakaoAccountResponse = await response.json();
      console.log("kakaoAccountResponse: ");
      console.log(kakaoAccountResponse);
    } else {
      console.log(`Error: ${response.status} ${response.statusText}`);
      throw new Error('Fetch failed');
    }
  } catch (e) {
    console.log('fetch 에러');
    console.log(e);

    const response = {
      result: 'fail',
      error: '토큰 에러',
    };
    res.send(response);
    return;
  }
  console.log('pass 에러');

  try {

    // 기존 코드에서는 const { data } = kakaoAccountResponse; 라고 되어있었습니다.
    // fetch는 data 객체를 가지고 있지 않으므로, kakaoAccountResponse를 그대로 사용합니다.
    // kakao서버로부터 전달받은 로그인 정보 중 
    // db에 저장을 원하는 정보를 추출
    const { id, kakao_account } = kakaoAccountResponse;  // kakaoAccountResponse에서 직접 정보를 가져옵니다.
    const { email, age_range, gender } = kakao_account;
    let result;
    // sequelize를 통해 user테이블에 해당 id가 존재하는지 검색
    result = await User.findOne({ where: { id: id } });
    console.log('result 찍어보기. 괜찮았는데..?');
    console.log(result);

    if (!result) {
      // 신규 유저 정보라면, 저장

      //데이터베이스에 저장할 사용자 정보를 객체 형태로 정의
      const payload = {
        id: id,
        email: email,
        age_range: age_range,
        gender: gender
      };
      //Users.create는 Sequelize 라이브러리에서 제공하는 메소드. 이 메소드는 새로운 레코드(행)를 데이터베이스 테이블에 추가할 때 사용
      //Users는Sequelize 모델로, 실제 데이터베이스의 테이블과 매핑되어 있음

      await User.create(payload);
      // 제대로 id가 삽입되었는지 확인 
      result = await User.findOne({ where: { id: id } });
      console.log('User.create 실행 후, Fridge.findAll 실행 전');  // Log 추가
      console.log(result);
      //----------------------------------------------------------------
      // 해당 id로 검색되는 아이템이 있는지 여부를 검색합니다.


    }

    try {
      const items = await Fridge.findAll({
        where: { user_no: result.user_no },
        include: [
          {
            model: User,
            attributes: ['user_no'],
            required: true
          },
          {
            model: Item,
            attributes: ['item_no', 'item_name', 'exp_date', 'item_category'],
            required: false // LEFT OUTER JOIN을 위해
          }
        ],
        attributes: ['fridge_no', 'fridge_name']
      });
      console.log('Fridge.findAll 실행 후');  // Log 추가


      console.log('items 확인');
      console.log(items);

      const response = {
        result: 'success',
        result,
        items
      };
      res.send(response);  // 이 부분을 try 블록 안으로 옮깁니다.
    } catch (e) {
      console.log('아이템 조회 중 오류 발생');
      console.error(e);
      const response = {
        result: 'fail',
        error: '아이템 조회 실패',
      };
      res.send(response);
    }


  } catch (e) {
    console.log(e);
    let msg = '';
    if (typeof e === 'string') {
      msg = e;
    } else if (e instanceof Error) {
      msg = e.message;
    }
    const response = {
      result: 'fail',
      error: msg,
    };

    res.send(response);
  }
};





exports.loading = function (req, res) {
  const adf = path.join(__dirname, '../../loading.html');
  console.log(adf);
  res.sendFile(adf);
};
