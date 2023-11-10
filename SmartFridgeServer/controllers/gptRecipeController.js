const { User, Fridge, Item, Image, Category } = require('../database/models/models');
const { Success, Failure } = require('../types/response');
const path = require('path');
const { sequelize } = require('../config/db');


// const express = require('express');

// const app = express();
// app.use(express.json());

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.CHAT_GPT_API_KEY
});


const gptPrompt = require('../config/gptPrompt');



function checkProperties(currentDish, step) {
  // 요리명이 있는지 확인
  if (!currentDish.hasOwnProperty('요리명')) {
    console.log(`요리${step}에 요리명 속성 누락`);
    return false;
  }

  // 영양정보가 모두 있는지 확인
  const requiredNutrients = ['단백질', '지방', '탄수화물', '칼로리'];
  if (!currentDish.hasOwnProperty('영양정보') || !requiredNutrients.every(nutrient => nutrient in currentDish.영양정보)) {
    console.log(`요리${step}에 영양정보 속성 누락`);
    return false;
  }

  // 재료가 있는지 확인
  if (!currentDish.hasOwnProperty('재료')) {
    console.log(`요리${step}에 재료 속성 누락`);
    return false;
  }

  // 추가필요재료가 있는지 확인
  if (!currentDish.hasOwnProperty('추가필요재료')) {
    console.log(`요리${step}에 추가필요재료 속성 누락`);
    return false;
  }

  // 모든 검사를 통과했으면 모든 정보가 존재함을 의미
  console.log(`요리${step} 정보 OK`);
  return true;
}


const gptRecipe = async (req, res) => {
  try {
    let myMessages = gptPrompt.gptmessages;
    // ...


    const { cooks } = req.body;
    const { cookLevel } = req.body;
    const { servings } = req.body;
    // console.log("cooks");
    console.log(cooks);
    console.log(cookLevel);
    console.log(servings);
    //test
    myMessages.push({
      role: "user",
      content: '{\n"재료": [\n{"이름": "고구마", "유통기한": 4, "양": "200g"},\n{"이름": "계란", "유통기한": 4, "양": "6개"},\n{"이름": "아몬드", "유통기한": 15, "양": "40g"},\n{"이름": "식빵", "유통기한": 2, "양": "40g"},\n{"이름": "김치", "유통기한": 143, "양": "1000g"}\n],\n'
        + `"인분": ${servings},\n"추천요리갯수": ${cooks},\n"요리실력": ${cookLevel},\n"우선순위": "유통기한 임박 재료"\n}\njson 형식으로 답변하세요.`
    })
    var retryCount = 0;

    for (retryCount = 1; retryCount <= 3; retryCount++) {
      // GPT 응답이 적절하지 경우 재시도 ( json 형태가 아닌 경우 )
      const response = await openai.chat.completions.create({
        // model: "gpt-3.5-turbo",
        model: "gpt-4-1106-preview",
        messages: myMessages,
        temperature: 0.1,
      });
      try {
        const jsonObj = JSON.parse(response.choices[0].message.content);
        // Use jsonObj here
        console.log("recipe json ok")

        try {
          var step;
          var gptOK = true;
          for (step = 1; step <= cooks; step++) { // step을 1부터 시작하여 5까지
            var currentDish = jsonObj[`요리${step}`]; // 요리1, 요리2, ... 요리5로 접근
            if (!checkProperties(currentDish, step)) {
              // 모든 요소 포함 여부
              gptOK = false;
              break;
            }
          }
          if (gptOK) {
            // OK
            return res.status(200).json({
              success: true,
              data: jsonObj,
              datatype: 'json',
            });
          }
        }
        catch (error) {
          // json 타입이지만 응답에 꼭 포함되어야하는 요소가 오지 않은 경우, 비정상 응답으로 판단 gpt 재시도
          console.log(`gpt contant error`);
        }
      } catch (error) {
        console.log(`recipe type error retryCount : ${retryCount}`);
      }
    }
    // 요청한 양식대로 응답이 오지 않은 경우 string type의 응답 전솓
    console.log("return string recipe")
    return res.status(200).json({
      success: false,
      data: response.choices[0].message.content,
      datatype: 'string',
    });


    // gpt통신에 대한 응답이 아예 오지 않는 경우
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }



};

module.exports = {
  gptRecipe,

};
