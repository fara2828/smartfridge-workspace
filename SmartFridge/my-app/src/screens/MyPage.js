import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';



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
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이똑냉</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 30, // h1 size
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%', // Fill the screen height
    backgroundColor: '#e0e0e0', // Grayish background color
    margin: 10,
    borderRadius: 5,
    marginLeft: '5%', // 20px spacing on the left
    marginRight: '5%', // 20px spacing on the right
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Natural shadow
    shadowRadius: 5,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  subBox: {
    width: '40%',
    height: 50,
    backgroundColor: '#e0e0e0', // Grayish background color
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Natural shadow
    shadowRadius: 5,
  },
});

export default MyPage;