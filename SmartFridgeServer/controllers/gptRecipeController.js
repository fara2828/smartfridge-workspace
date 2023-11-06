const {User, Fridge, Item, Image, Category}  = require('../database/models/models');
const { Success, Failure } = require('../types/response');
const path = require('path');
const { sequelize } = require('../config/db');


const express = require('express');

const app = express();
app.use(express.json());

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey:process.env.CHAT_GPT_API_KEY
});


const gptPrompt = require('../config/gptPrompt');

const gptRecipe =  async (req, res) => {
  try {
    let my_messages = gptPrompt.gptmessages;
    
    //test
    my_messages.push({
      role: "user",
      content: '{\n"재료": [\n{"이름": "고구마", "유통기한": 4, "양": "200g"},\n{"이름": "계란", "유통기한": 4, "양": "6개"},\n{"이름": "아몬드", "유통기한": 15, "양": "40g"},\n{"이름": "식빵", "유통기한": 2, "양": "40g"},\n{"이름": "김치", "유통기한": 143, "양": "1000g"}\n],\n"인분": 1,\n"추천요리갯수": 3,\n"요리실력": "중급",\n"우선순위": "유통기한 임박 재료"\n}\njson 형식으로 답변하세요.'
    })
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: my_messages,
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
      console.log("recipe string ok")
      return res.status(200).json({
        success: true,
        data: response.choices[0].message.content,
        datatype: 'string',
      });
    }

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
