import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, View, TextInput, Button, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { API_BASE_URL } from '../services/apiConfig';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';
import GptImage from '../assets/images/sm_logo.png';
const GptRecipe = () => {

  const [isReady, setIsReady] = useState(false);

  // 폰트 로딩을 위한 useEffect 훅
  useEffect(() => {
    // 비동기 로딩 함수
    const loadFonts = async () => {
      await Font.loadAsync({
        NotoSans: require("../assets/fonts/NotoSans.ttf"),
        Dongle: require("../assets/fonts/Dongle-Regular.ttf"),
      });
      setIsReady(true);
    };
    loadFonts(); // 함수 호출
  }, []);




  const [modalVisible, setModalVisible] = useState(false);
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
        setModalVisible(true);

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
  // console.log("gptRecipe2")\

  if (!isReady) {
    return <View><Text>Loading...</Text></View>; // 폰트가 로딩되지 않았을 때 로딩 텍스트를 표시
  }

  const renderRecipeCards = () => (
    <View style={styles.modalContent}>
      {Object.keys(myrecipe).map((key) => (
        <View key={key} style={styles.recipeCard}>
          {renderRecipeCardContent(myrecipe[key])}
        </View>
      ))}
    </View>
  );
  
  // 새로운 레시피 컨텐츠 렌더링 함수
  const renderRecipeCardContent = (recipe) => {
    return (
      <>
        <Text style={styles.title2}>{recipe.요리명}</Text>
        <Text style={styles.subtitle}>재료:</Text>
        {recipe.재료.split('\n').map((ingredient, index) => (
          <Text key={index} style={styles.ingredientItem}>- {ingredient}</Text>
        ))}
        <Text style={styles.subtitle}>추가 필요재료:</Text>
        {recipe.추가필요재료.split('\n').map((ingredient, index) => (
          <Text key={index} style={styles.ingredientItem}>- {ingredient}</Text>
        ))}
      </>
    );
  };




  return (


    <>
      <StatusBar hidden={true} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        <Image source={GptImage} style={styles.GptImage} />
        <Text style={styles.instructionText}>추천요리 숫자를 선택하세요</Text>
        <Picker
          selectedValue={cooks}
          style={styles.picker}// Picker 아래에 간격을 주기 위해 marginBottom 추가
          onValueChange={(itemValue, itemIndex) => setCooks(itemValue)}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
        <Text style={styles.instructionText}>요리 실력을 알려주세요.</Text>
        <Picker
          selectedValue={cookLevel}
          style={styles.picker} // Picker 아래에 간격을 주기 위해 marginBottom 추가
          onValueChange={(itemValue, itemIndex) => setCookLevel(itemValue)}
        >
          <Picker.Item label="초급" value="초급" />
          <Picker.Item label="중급" value="중급" />
          <Picker.Item label="고급" value="고급" />
        </Picker>
        <Text style={styles.instructionText}>몇 인분을 만드실 건가요?</Text>
        <TextInput
          value={servings}
          onChangeText={setServings}
          placeholder="인분 입력"
          keyboardType="numeric" // 숫자 키보드 타입 설정
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.button} onPress={fetchGPT3Response} disabled={loading}>
          <Text style={styles.buttonText}>AI 요리 추천</Text>
        </TouchableOpacity>

        {/* 여기에 margin을 추가할 수도 있습니다. */}
        {gpt3Response && <Text style={{ marginTop: 20 }}>{`GPT-3 Response: ${gpt3Response}`}</Text>}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView style={styles.modalScrollView}>
            {recipeTypeOK ? renderRecipeCards() : <Text>Loading or No Recipes...</Text>}
          </ScrollView>
          <Button title="닫기" onPress={() => setModalVisible(false)} />
        </Modal>

      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  // Adapted from LoginScreen, apply similar styling to GptRecipe components
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  scrollViewContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',

  },
  instructionText: {
    fontFamily: 'Dongle', // Assuming you've loaded this font as in LoginScreen
    fontSize: 25,
    color: '#030066',
    marginBottom: 10, // Spacing for aesthetic appearance
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 20,
    fontFamily: 'NotoSans', // Font consistency
    justifyContent: 'center',

  },
  button: {
    // Button styles from LoginScreen for consistency
    backgroundColor: '#0054FF',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20, // Spacing after the button
  },
  buttonText: {
    fontFamily: 'NotoSans',
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },

  GptImage: {
    width: 200, // 가로 크기
    height: 200, // 세로 크기
    resizeMode: 'contain', // 이미지가 가로 세로 비율을 유지하면서 컨테이너에 맞춰집니다.
    borderRadius: 20, // 이미지의 모서리를 둥글게 합니다.
    marginBottom: 32, // 이미지 아래쪽의 여백을 줍니다.
    borderWidth: 1, // 이미지의 테두리 선의 두께를 정합니다.
    borderColor: '#ddd', // 테두리 색상을 설정합니다.
    shadowColor: '#000', // 그림자의 색상
    shadowOffset: { width: 0, height: 1 }, // 그림자의 방향과 거리
    shadowOpacity: 0.8, // 그림자의 투명도
    shadowRadius: 2, // 그림자의 블러 정도
  },
  textInput: {
    height: 50,
    width: 150,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10, // 테두리를 둥글게 합니다.
    borderColor: '#008299', // 테두리 색상을 검정으로 설정합니다.
    backgroundColor: '#FFF', // 배경색을 흰색으로 설정합니다.
    shadowColor: '#000', // 그림자의 색상을 검정으로 설정합니다.
    shadowOffset: { width: 0, height: 2 }, // 그림자의 위치를 조정합니다.
    shadowOpacity: 0.1, // 그림자의 투명도를 설정합니다.
    shadowRadius: 3, // 그림자의 반경을 설정합니다.
    elevation: 3, // 안드로이드에서 그림자 효과를 줍니다.
  }
  ,
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
  modal: {
    flex: 1,
    justifyContent: 'center', // 모달의 내용을 세로축 중앙에 정렬
    alignItems: 'center', // 모달의 내용을 가로축 중앙에 정렬
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20, // 모달의 모서리를 둥글게 합니다
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ingredientItem: {
    fontSize: 14,
    marginLeft: 10, // 목록의 각 항목 앞에 왼쪽 여백을 줍니다
  },
});



export default GptRecipe;