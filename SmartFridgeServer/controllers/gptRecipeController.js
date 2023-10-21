const {User, Fridge, Item, Image, Category}  = require('../database/models/models');
const { Success, Failure } = require('../types/response');
const path = require('path');
const { sequelize } = require('../config/db');


const express = require('express');
// const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

// const configuration = new Configuration({
//   organization: "org-OyQo4auoyUtYYPlmPWg1zQbL",
//   apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey:'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'
});

const gptPrompt = require('../config/gptPrompt');

const gptRecipe =  async (req, res) => {
  // 1. 유저 식별 (실제로는 데이터베이스 조회, 토큰 검증 등을 할 수 있습니다.)
  // const userId = req.body.userId || "defaultUserId";

  // 2. GPT-3 대화  // 2. 초기 대화 설정
  let messages = gptPrompt.gptmessages;
  // const response = await openai.listEngines();
  //test
  messages.push({
    "role": "user",
    "content": '{\n'+
      '"재료": [\n'+
        '{"이름": "고구마", "유통기한": 4, "양": "200g"},\n'+
        '{"이름": "계란", "유통기한": 4, "양": "6개"},\n'+
        '{"이름": "아몬드", "유통기한": 15, "양": "40g"},\n'+
        '{"이름": "식빵", "유통기한": 2, "양": "40g"},\n'+
        '{"이름": "김치", "유통기한": 143, "양": "1000g"}\n'+
      '],\n'+
      '"인분": 1,\n'+
      '"추천요리갯수": 3,\n'+
      '"요리실력": "중급",\n'+
      '"우선순위": "유통기한 임박 재료"\n'+
    '}\n'+
    'json 형식으로 답변하세요.'
  })
  //real
  // messages.push({
  //   role: "user",
  //   content: req.body.content
  // })
  const maxTokens = 13000;
  // var gpt3Response;
  
  try {
    const gpt3Response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: maxTokens,
    });
    
    // 3. 결과 반환
    const finalResponse = gpt3Response.choices[0].message;
    console.log(finalResponse);
    res.json({ userId, response: finalResponse });
  } catch (error) {
    return res.status(500).json({ error: 'Error in GPT-3 API call' });
  }

};

module.exports = {
  gptRecipe,
  
};

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
