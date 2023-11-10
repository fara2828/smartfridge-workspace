import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';

import * as Font from 'expo-font';


const MyPage = ({ navigation, route }) => {
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

  const { user, items } = route.params;

  console.log('myPage.js');
  console.log(user);
  console.log('-------------itemms배열 확인---------------');
  console.log(items);
  // 상태 변수들과 그 변경 함수
  const [fridgeCount, setFridgeCount] = useState(0);  // 냉장고 아이템 카운트
  const [freezerCount, setFreezerCount] = useState(0);  // 냉동고 아이템 카운트
  const [roomCount, setRoomCount] = useState(0);  // 상온 아이템 카운트

  const [isModalVisible, setModalVisible] = useState(false);  // 모달 창의 보이기/숨기기
  const [fridgeNames, setFridgeNames] = useState([]);  // 고유한 냉장고 이름 목록
  const [selectedFridgeName, setSelectedFridgeName] = useState(null);  // 선택한 냉장고 이름


  const fridgeNameSet = new Set();  // 고유한 냉장고 이름을 저장할 Set

  // items 배열이 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    let fridge = 0, freezer = 0, room = 0;  // 각 저장 유형의 카운트

    // items 배열을 한 번만 순회
    for (const row of items) {
      // 카운트 업데이트
      console.log('for문의 itmes 확인')
      console.log(items)
      if (row.storage_type === 'fridge') fridge++;
      if (row.storage_type === 'freezer') freezer++;
      if (row.storage_type === 'room') room++;

      // 고유한 냉장고 이름을 Set에 추가
      fridgeNameSet.add(row.Fridge.fridge_name);
      console.log('fridgeNameSet');
      console.log(fridgeNameSet);
    }

    // 상태 업데이트
    setFridgeCount(fridge);
    setFreezerCount(freezer);
    setRoomCount(room);
    setFridgeNames(Array.from(fridgeNameSet));  // Set을 배열로 변환
  }, [items]);

  // 모달을 보이게 하는 함수
  const showModal = () => {
    setModalVisible(true);
  };

  // 모달을 숨기는 함수
  const hideModal = () => {
    setModalVisible(false);
  };

  // 냉장고 이름을 선택하는 로직
  const handleFridgeNameSelection = (name) => {
    setSelectedFridgeName(name);
    hideModal();
    // 이동 로직, 예를 들면 navigation.navigate 등
  };

  // 아이템을 정렬하는 함수
  const getSortedItems = (items, key) => {
    const sortedItems = items.slice();  // 원본 배열을 복사
    sortedItems.sort((a, b) => new Date(b[key]) - new Date(a[key]));  // 정렬
    return sortedItems;
  };

  // 아이템을 필터링하고 정렬하는 함수
  const filterAndSortItems = (items, type, key) => {
    const filteredItems = items.filter((item) => item.storage_type === type);  // 필터링
    return getSortedItems(filteredItems, key);  // 필터링된 아이템을 정렬
  };

  const callGPT = async () => {
    navigation.navigate('GptRecipe');
    return;
  }

  if (!isReady) {
    return <View><Text>Loading...</Text></View>; // 폰트가 로딩되지 않았을 때 로딩 텍스트를 표시
  }
  return (

    <ScrollView style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.number}>{fridgeCount}</Text>
          <Text style={styles.label}>냉장</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.number}>{freezerCount}</Text>
          <Text style={styles.label}>냉동</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.number}>{roomCount}</Text>
          <Text style={styles.label}>실온</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={showModal}>
          <Text style={styles.buttonText}>냉장고 바로가기</Text>
        </TouchableOpacity>
        {/* AddItem으로 user_no, fridges 전달 */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItem', { userNo: user.user_no, fridges: fridgeNames })}>
          <Text style={styles.buttonText}>냉장고 저장하기</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
        <View style={{ backgroundColor: 'white', padding: 22, borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)', }}>
          {fridgeNames.map((name, index) => (
            <TouchableOpacity key={index} onPress={() => handleFridgeNameSelection(name)}>
              <Text>{name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={hideModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.statusContainer}>
        {
          ['아! 맞다', '최근 추가 항목', '냉장실', '냉동실'].map((text, index) => (
            <View key={index} style={styles.statusSection}>
              <Text style={styles.statusText}>{text}</Text>
              <View style={styles.imageContainer}>
                {/* Static image for '아! 맞다' */}
                {text === '아! 맞다' && (
                  <>
                    <View style={styles.imageWrapper}>
                      <Image source={require('../assets/images/potato.jpg')} style={styles.image} />
                      <Text style={styles.expiryLabel}>-5</Text> 
                    </View>
                    <View style={styles.imageWrapper}>
                      <Image source={require('../assets/images/kimchi.jpg')} style={styles.image} />
                      <Text style={styles.expiryLabel}>-2</Text> 
                    </View>
                  </>
                )}
                {/* Static image for '최근 추가 항목' */}
                {text === '최근 추가 항목' && (
                  <>
                    <View style={styles.imageWrapper}>
                      <Image source={require('../assets/images/snack.jpg')} style={styles.image} />
                      <Text style={styles.expiryLabel}>-107</Text> 
                    </View>
                    <View style={styles.imageWrapper}>
                      <Image source={require('../assets/images/steak.jpg')} style={styles.image} />
                      <Text style={styles.expiryLabel}>-214</Text> 
                    </View>
                  </>
                )}
                {/* Static image for '냉장실' */}
                {text === '냉장실' && (
                  <>
                    <View style={styles.imageWrapper}>
                      <Image source={require('../assets/images/egg.jpg')} style={styles.image} />
                      <Text style={styles.expiryLabel}>-25</Text> 
                    </View>
                    <View style={styles.imageWrapper}>
                      <Image source={require('../assets/images/potato.jpg')} style={styles.image} />
                      <Text style={styles.expiryLabel}>-5</Text> 
                    </View>
                  </>
                )}
                {/* Static image for '냉동실' */}
                {text === '냉동실' && (
                  <>
                    <View style={styles.imageWrapper}>
                      <Image source={require('../assets/images/tofu.jpg')} style={styles.image} />
                    </View>
                    <View style={styles.imageWrapper}>
                      <Image source={require('../assets/images/steak.jpg')} style={styles.image} />
                    </View>
                  </>
                )}
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Dongle',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#007bff',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    fontFamily: 'Dongle',
  },
  statusSection: {
    width: '100%', // Use the full width for each section
    alignItems: 'flex-start', // Align children to the start (left) not center
    marginBottom: 20,
    paddingLeft: 10, // Add some padding to the left to keep the content inside
  },
  imageContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
  number: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'NotoSans',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginTop: 4,
    padding: 5,
    fontFamily: 'NotoSans'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 0,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Dongle',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensure even space distribution
    marginTop: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'left', // Align text to the left
    fontFamily: 'Dongle',
  },
  // Combining subContainer and subBox styles with the consideration of all properties
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginVertical: 10,
  },
  subBox: {
    width: '45%',
    height: 60,
    backgroundColor: '#6c757d',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 5,
  },
  // Consolidating image style definitions
  imageContainer: {
    flexDirection: 'row', // Arrange images in a row
    justifyContent: 'space-around', // Space them evenly
    marginTop: 0,
  },
  image: {
    width: 150, // 이미지의 너비를 설정합니다.
    height: 150, // 이미지의 높이를 설정합니다.
    margin: 15, // 이미지 주위의 마진을 설정합니다.
     
    borderRadius: 15
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontWeight: '600',
    color: '#dc3545',
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Dongle',
  },
  modalCloseButton: {
    alignItems: 'center',
    padding: 10,
  },
  imageWrapper: {
    position: 'relative', // 부모 'View'에 대해 상대적 위치
  },
  expiryLabel: {
    position: 'absolute', // 'Text'를 절대 위치로 설정
    top: 14, // 상단에서 5픽셀 아래에 위치
    left: 15, // 왼쪽에서 5픽셀 오른쪽에 위치
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // 배경색은 흰색 투명도 조절
    padding: 7, // 안쪽 여백
    borderRadius: 10, // 테두리 둥글게
    fontSize: 15, // 글자 크기
    fontWeight: 'bold', // 글자 두껍게
    color: '#333', // 글자 색상
  },
  statusText: {
    fontSize: 30,
    color: '#333',
    // Add this line to apply the 'NotoSans' font to the statusText style
    fontFamily: 'Dongle',
  },
});


export default MyPage;