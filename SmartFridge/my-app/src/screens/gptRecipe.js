import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, StatusBar } from 'react-native';
import { API_BASE_URL } from '../services/apiConfig';
import { Picker } from '@react-native-picker/picker';

const GptRecipe = () => {
  const [gpt3Response, setGpt3Response] = useState(null);
  const REDIRECT_URI = API_BASE_URL + '/gptRecipe';

  const [cooks, setCooks] = useState("3"); // 기본값 설정
  const [cookLevel, setCookLevel] = useState("중급"); // 기본값 설정
  const [servings, setServings] = useState('1'); // 인분 입력 상태

  const fetchGPT3Response = async () => {
    try {
      const response = await fetch(REDIRECT_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: 'someUserId' ,
          cooks: cooks ,
          cookLevel: cookLevel ,
          servings: servings 
        }), // 유저 ID를 전달
      });

      const data = await response.json();
      // console.log(data);
      console.log(data.data);
      if (data.datatype == "json") {
        var step;
        for (step = 1; step <= cooks; step++) { // step을 1부터 시작하여 5까지
          try {
            // 요리명과 관련 정보는 템플릿 리터럴과 변수를 사용하여 동적으로 생성합니다.
            var currentDish = data.data[`요리${step}`]; // 요리1, 요리2, ... 요리5로 접근

            console.log(`요리${step} 요리명 : ${currentDish.요리명}`);
            console.log(`요리${step} 재료 : ${currentDish.재료}`);
            console.log(`요리${step} 추가필요재료 : ${currentDish.추가필요재료}`);
          } catch (error) {
            // 오류 발생시 핸들링할 로직, 예를 들어 오류 로깅
            console.error(`요리${step} 정보를 불러오는 데 실패했습니다: `, error);
          }
        }
      } else {  // data.datatype == 'string'
        console.log(data.datatype);

      }

      setGpt3Response(data.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // console.log("gptRecipe2")
  return (
    <>
    <StatusBar hidden={true} />
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 40 }}>
      <Text>추천요리 숫자를 선택하세요</Text>
      <Picker
        selectedValue={cooks}
        style={{ height: 50, width: 150, marginBottom: 20 }} // Picker 아래에 간격을 주기 위해 marginBottom 추가
        onValueChange={(itemValue, itemIndex) => setCooks(itemValue)} 
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
      </Picker>
      <Text>요리 실력을 알려주세요.</Text>
      <Picker
        selectedValue={cookLevel}
        style={{ height: 50, width: 150, marginBottom: 20 }} // Picker 아래에 간격을 주기 위해 marginBottom 추가
        onValueChange={(itemValue, itemIndex) => setCookLevel(itemValue)}
      >
        <Picker.Item label="초급" value="초급" />
        <Picker.Item label="중급" value="중급" />
        <Picker.Item label="고급" value="고급" />
      </Picker>
      <Text>몇 인분을 만드실 건가요?</Text>
        <TextInput
          value={servings}
          onChangeText={setServings}
          placeholder="인분 입력"
          keyboardType="numeric" // 숫자 키보드 타입 설정
          style={{ height: 50, width: 150, marginBottom: 20, borderWidth: 1, padding: 10 }}
        />
      <Button title="Fetch GPT-3 Response" onPress={fetchGPT3Response} />
      {/* 여기에 margin을 추가할 수도 있습니다. */}
      {gpt3Response && <Text style={{ marginTop: 20 }}>{`GPT-3 Response: ${gpt3Response}`}</Text>}
    </View>

    </>
  );
};


// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#f3f3f3', // 배경 색상
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    alignSelf: 'flex-start',
    marginLeft: 50,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    width: 300,
    height: 200,
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  response: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    fontSize: 16,
  },
});

export default GptRecipe;