import React, { useState } from 'react';
import { ScrollView, View, TextInput, Button, Text, StyleSheet, StatusBar } from 'react-native';
import { API_BASE_URL } from '../services/apiConfig';
import { Picker } from '@react-native-picker/picker';

const GptRecipe = () => {
  const [gpt3Response, setGpt3Response] = useState(null);
  const REDIRECT_URI = API_BASE_URL + '/gptRecipe';

  const [myrecipe, setMyRecipe] = useState(null);
  const [recipeTypeOK, setrecipeTypeOK] = useState(null);

  const [cooks, setCooks] = useState("3"); // 기본값 설정
  const [cookLevel, setCookLevel] = useState("중급"); // 기본값 설정
  const [servings, setServings] = useState('1'); // 인분 입력 상태
  const [retryCount, setRetryCount] = useState(0);
  const [loading, setloading] = useState(false); // waiting

  const fetchGPT3Response = async () => {
    if (loading) return; // 이미 로딩 중이면 아무 작업도 수행하지 않음
    try {
      setloading(true);
      setrecipeTypeOK(false);
      const response = await fetch(REDIRECT_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'someUserId',
          cooks: cooks,
          cookLevel: cookLevel,
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
            throw new Error('원하는 결과가 아닙니다.'); // 예외를 발생시켜 catch 블록으로 이동
          }
        }
        setMyRecipe(data.data);
        setrecipeTypeOK(true);

      } else {  // data.datatype == 'string'
        console.log(data.datatype);
        setrecipeTypeOK(false);
        // 결과가 원하는 대로 오지 않았을 때
        throw new Error('원하는 결과가 아닙니다.'); // 예외를 발생시켜 catch 블록으로 이동


      }

      setGpt3Response(data.response);

      // setMyRecipe(data.response);
      // if (data.response) {

      // }
    } catch (error) {
      // 재시도
      if (retryCount < 3) {
        setRetryCount(prevCount => prevCount + 1); // 재시도 횟수 증가
        fetchGPT3Response(); // 함수 재호출
      }
    } finally {
      setloading(false); // 요청이 완료되거나 오류가 발생하면 로딩 상태를 false로 설정
    }
  };
  // console.log("gptRecipe2")
  return (
    <>
      <StatusBar hidden={true} />
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 40
        }}
        style={{ flex: 1 }}
      >
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
        <Button
          title="GPT-4 요리 추천"
          onPress={fetchGPT3Response}
          disabled={loading} // loading 상태에 따라 버튼 활성/비활성 상태를 결정
        />

        {/* 여기에 margin을 추가할 수도 있습니다. */}
        {gpt3Response && <Text style={{ marginTop: 20 }}>{`GPT-3 Response: ${gpt3Response}`}</Text>}

        {recipeTypeOK &&
          <View style={styles.container}>
            {Object.keys(myrecipe).map((key) => (
              <View key={key} style={styles.recipeCard}>
                <Text style={styles.title2}>{myrecipe[key].요리명}</Text>
                <Text style={styles.subtitle}>재료: {myrecipe[key].재료}</Text>
                <Text style={styles.subtitle}>추가 필요 재료: {myrecipe[key].추가필요재료}</Text>
                <View style={styles.nutritionInfo}>
                  <Text style={styles.nutritionTitle}>영양 정보:</Text>
                  {Object.keys(myrecipe[key].영양정보).map((nutrient) => (
                    <Text key={nutrient} style={styles.nutritionText}>
                      {nutrient}: {myrecipe[key].영양정보[nutrient]}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        }

      </ScrollView>

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
  recipeCard: {
    flex: 1,
    marginBottom: 10,
    margin: 10,
    padding: 15,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  nutritionInfo: {
    marginTop: 10,
  },
  nutritionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nutritionText: {
    fontSize: 14,
    color: '#555',
  },
});

export default GptRecipe;