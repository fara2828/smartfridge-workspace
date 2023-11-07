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

const gptRecipe = async (req, res) => {
  try {
    let my_messages = gptPrompt.gptmessages;
    const { cooks } = req.body;
    const { cookLevel } = req.body;
    const { servings } = req.body;
    // console.log("cooks");
    console.log(cooks);
    console.log(cookLevel);
    console.log(servings);
    //test
    my_messages.push({
      role: "user",
      content: '{\n"재료": [\n{"이름": "고구마", "유통기한": 4, "양": "200g"},\n{"이름": "계란", "유통기한": 4, "양": "6개"},\n{"이름": "아몬드", "유통기한": 15, "양": "40g"},\n{"이름": "식빵", "유통기한": 2, "양": "40g"},\n{"이름": "김치", "유통기한": 143, "양": "1000g"}\n],\n'
        + `"인분": ${servings},\n"추천요리갯수": ${cooks},\n"요리실력": ${cookLevel},\n"우선순위": "유통기한 임박 재료"\n}\njson 형식으로 답변하세요.`
    })
    var retryCount = 0;

    for (retryCount = 1; retryCount <= 3; retryCount++) {
      // GPT 응답이 이상한 경우 재시도 ( json 형태가 아닌 경우 )
      const response = await openai.chat.completions.create({
        // model: "gpt-3.5-turbo",
        model: "gpt-4-1106-preview",
        messages: my_messages,
        temperature : 0.1,
      });
      try {
        const jsonObj = JSON.parse(response.choices[0].message.content);
        // Use jsonObj here
        console.log("recipe json ok")
        return res.status(200).json({
          success: true,
          data: jsonObj,
          datatype: 'json',
        });
      } catch (error) {
        console.log(`recipe string retryCount :${retryCount}`)
      }

    }
    console.log("return string recipe")
    return res.status(200).json({
      success: false,
      data: response.choices[0].message.content,
      datatype: 'string',
    });


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
