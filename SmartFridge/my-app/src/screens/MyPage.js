import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import * as Font from 'expo-font';


const MyPage = ({ navigation, route }) => {

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


  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>마이똑냉</Text>
      <TouchableOpacity style={styles.button} onPress={() => callGPT()}>
          <Text>gpt요리추천</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItem', {userNo: user.user_no,  fridges :fridgeNames }) }>
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
        {['아! 맞다', '최근 추가 항목', '냉장실', '냉동실'].map((text, index) => {
          let selectedItems = [];
          if (text === '아! 맞다' || text === '최근 추가 항목') {
            selectedItems = getSortedItems(items, 'exp_date').slice(0, 2);
          } else if (text === '냉장실') {
            selectedItems = filterAndSortItems(items, 'fridge', 'exp_date').slice(0, 2);
          } else if (text === '냉동실') {
            selectedItems = filterAndSortItems(items, 'freezer', 'exp_date').slice(0, 2);
          }

          return (
            <View key={index}>
              <Text style={styles.statusText}>{text}</Text>
              <View style={styles.subContainer}>
                {selectedItems.map((item, idx) => (
                  <View key={idx} style={styles.subBox}>
                    <Text>{item.Image.file_name}</Text>
                    {/* item_name 필드가 있다면 다음과 같이 표시 */}
                    {/* <Text>{item.item_name}</Text> */}
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Changed to pure white for a clean look
  },
  title: {
    fontSize: 26, // Increased size for better readability
    fontWeight: 'bold',
    color: '#333', // Darker shade for better contrast
    marginBottom: 20, // Spacing below title
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Added spacing below the box container
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120, // Fixed height for equal sizing
    backgroundColor: '#007bff', // A shade of blue for a vibrant look
    margin: 10,
    borderRadius: 10, // Rounded corners
    elevation: 3, // Android shadow
  },
  number: {
    fontSize: 32, // Larger text for the count
    fontWeight: 'bold',
    color: '#ffffff', // White text for readability
  },
  label: {
    fontSize: 18, // Larger label text
    color: '#fff', // White label text
    marginTop: 4, // Space between number and label
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#28a745', // A more appealing green shade
    padding: 15, // More padding for a larger button
    borderRadius: 8, // Rounded corners for buttons
    width: '45%', // Slightly larger width for balance
    alignItems: 'center',
    elevation: 2, // Android shadow
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500', // Changed from bold to 500 for a lighter appearance
    fontSize: 16, // Increased font size for buttons
  },
  statusContainer: {
    marginTop: 20,
  },
  statusText: {
    fontSize: 20, // Size up for heading of sections
    fontWeight: 'bold',
    color: '#212529', // Using a dark shade for the title text
    marginBottom: 15, // More spacing for a cleaner look
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15, // Consistent spacing at the bottom
  },
  subBox: {
    width: '45%', // Adjusting to match button width
    height: 60, // A taller box to fit larger text or more content
    backgroundColor: '#6c757d', // A soft dark background for contrast
    borderRadius: 8, // Rounded corners for sub-boxes
    justifyContent: 'center', // Vertically centering the content
    alignItems: 'center', // Horizontally centering the content
    elevation: 1, // Subtle shadow for depth
  },
});


export default MyPage;