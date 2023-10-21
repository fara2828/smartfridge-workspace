import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { API_BASE_URL } from '../services/apiConfig';

const GptRecipe = () => {
    const [gpt3Response, setGpt3Response] = useState(null);
    const REDIRECT_URI = API_BASE_URL+'/jin/gptRecipe';
    const fetchGPT3Response = async () => {
      try {
        const response = await fetch(REDIRECT_URI, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          // body: JSON.stringify({ userId: 'someUserId' }), // 유저 ID를 전달
        });
  
        const data = await response.json();
        console.log(data);
        setGpt3Response(data.response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Fetch GPT-3 Response" onPress={fetchGPT3Response} />
        {gpt3Response && <Text>{`GPT-3 Response: ${gpt3Response}`}</Text>}
      </View>
    );
  };
  

export default GptRecipe;