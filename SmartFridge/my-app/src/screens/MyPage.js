import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MyPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이똑냉</Text>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.number}>10</Text>
          <Text style={styles.label}>냉장</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.number}>5</Text>
          <Text style={styles.label}>냉동</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.number}>15</Text>
          <Text style={styles.label}>실온</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyFridge')}>
          <Text style={styles.buttonText}>냉장고 바로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItem')}>
          <Text style={styles.buttonText}>냉장고 저장하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statusContainer}>
        {['아! 맞다', '최근 추가 항목', '냉장실', '냉동실'].map((text, index) => (
          <View key={index}>
            <Text style={styles.statusText}>{text}</Text>
            <View style={styles.subContainer}>
              <View style={styles.subBox} >
                <Text>최근1</Text>
              </View>
              <View style={styles.subBox} >
                <Text>최근2</Text>
              </View>
            </View>
          </View>
        ))}
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