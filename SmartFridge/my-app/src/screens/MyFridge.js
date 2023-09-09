// MyFridge.js 파일
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MyFridge = ({ navigation }) => {
    return (
        <View>
            <Text>My Fridge Screen</Text>
            <TouchableOpacity title="회원가입" onPress={() => navigation.navigate('SignUpScreen')} />
        </View>
    );
};

export default MyFridge; // 올바른 export 확인
