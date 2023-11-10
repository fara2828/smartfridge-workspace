import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import fetch from 'node-fetch';

// 공공데이터 접근
// API 키
const apiKey = "da53915e60b24b1eb9ea";
// Open API URL

const url = 'http://openapi.foodsafetykorea.go.kr/api/' + apiKey + '/C005/json/1/5/BAR_CD='
//http://openapi.foodsafetykorea.go.kr/api/sample/C005/xml/1/5/BAR_CD=값
// const url = 'http://openapi.foodsafetykorea.go.kr/api/' + apiKey + '/I2570/json/1/5/BRCD_NO=8809360172547'
            //http://openapi.foodsafetykorea.go.kr/api/인증키/서비스명/요청파일타입/요청시작위치/요청종료위치
const RadioButton = ({ value, label, selectedValue, onSelect }) => (
    <TouchableOpacity style={styles.radioButton} onPress={() => onSelect(value)}>
        <Text>{label}</Text>
        <View style={[styles.radioButtonCircle, selectedValue === value && styles.radioButtonSelected]} />
    </TouchableOpacity>
);

const AddItem = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [category, setCategory] = useState(null);
    const [count, setCount] = useState(null);
    const [division, setDivision] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [showPurchasePicker, setShowPurchasePicker] = useState(false);
    const [showExpiryPicker, setShowExpiryPicker] = useState(false)
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');

    const [barcode, setBarcode] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [error, setError] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [product, setProduct] = useState(null);

    // 카메라 접근 권한을 얻는 부분




    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status === 'granted');
        })();
    }, []);


    const onChangePurchaseDate = (event, selectedDate) => {
        setShowPurchasePicker(false);
        const currentDate = selectedDate || purchaseDate;
        setPurchaseDate(currentDate);
    };

    const onChangeExpiryDate = (event, selectedDate) => {
        setShowExpiryPicker(false);
        const currentDate = selectedDate || expiryDate;
        setExpiryDate(currentDate);
    };

    const uploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };
    const onBarcodeScan = async ({ type, data }) => {
        console.log('Barcode scanned!', type, data);
        console.log('Barcode scanned!', type, data);

        setScanned(true);
        // 인식된 바코드의 값과 형식을 state에 저장
        setBarcode({ type, data });
        

        // setBarcode({ type, data });
        // // Open API 호출
        data='195505090011'

        fetch(url + data)
            .then(response => {
                console.log("Raw API Response:", response);
                return response.json();
            })
            .then(data => {
                console.log("Parsed API Data:", data);  // 로그 추가
                // setProduct(data.I2570.row[0].PRDLST_NM);
                setProduct(data.C005.row[0].PRDLST_NM);
            })
            .catch(error => {
                console.log("API Error:", error);  // 에러 로그 추가
                setError(error.message);
            });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>구분</Text>
                <View style={styles.row}>
                    <RadioButton value="냉장실" label="냉장실" selectedValue={division} onSelect={setDivision} />
                    <RadioButton value="냉동실" label="냉동실" selectedValue={division} onSelect={setDivision} />
                    <RadioButton value="실온" label="실온" selectedValue={division} onSelect={setDivision} />
                </View>

                <Text style={styles.label}>카테고리</Text>
                <Picker selectedValue={category} onValueChange={(value) => setCategory(value)} style={styles.picker}>
                    <Picker.Item label="야채" value="야채" />
                    <Picker.Item label="육류" value="육류" />
                    <Picker.Item label="조미료" value="조미료" />
                </Picker>

                <Text style={styles.label}>갯수</Text>
                <Picker selectedValue={count} onValueChange={(value) => setCount(value)} style={styles.picker}>
                    {[...Array(100)].map((_, index) => (
                        <Picker.Item label={String(index + 1)} value={index + 1} key={index} />
                    ))}
                </Picker>

                {/* 구매일자 */}
                <Text>구매일자</Text>
                <TouchableOpacity onPress={() => setShowPurchasePicker(true)}>
                    <Text>{purchaseDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showPurchasePicker && (
                    <DateTimePicker mode="date" value={purchaseDate} onChange={onChangePurchaseDate} />
                )}


                {/* 유통기한 */}
                <Text>유통기한</Text>
                <TouchableOpacity onPress={() => setShowExpiryPicker(true)}>
                    <Text>{expiryDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showExpiryPicker && (
                    <DateTimePicker mode="date" value={expiryDate} onChange={onChangeExpiryDate} />
                )}

                <Text style={styles.label}>구매처</Text>
                <TextInput style={styles.input} onChangeText={setStore} value={store} />

                <Text style={styles.label}>사진</Text>
                {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
                <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                    <Text>사진 업로드</Text>
                </TouchableOpacity>
                <Text style={styles.label}>바코드 스캔</Text>


                <TouchableOpacity onPress={() => setIsScanning(!isScanning)}>
                    <Text>{isScanning ? '스캔 중지' : '바코드 스캔'}</Text>
                </TouchableOpacity>

                {isScanning && cameraPermission && (
                    <Camera
                        onBarCodeScanned={onBarcodeScan}
                        style={{ width: 200, height: 200 }}
                    />
                )}
                {/* <Text>{barcode}</Text> */}
                {barcode && <Text>스캔된 바코드: {barcode.data}</Text>}
                {barcode && (
                    <View style={styles.infoContainer}>
                        <Text>바코드 값: {barcode ? barcode.data : "없음"}</Text>
                        <Text>바코드 형식: {barcode ? barcode.type : "없음"}</Text>
                        <Text>제품명: {product ? product : "없음"}</Text>
                        <Text>에러 메시지: {error ? error : "없음"}</Text>
                        <Text onPress={() => setScanned(false)}>다시 스캔하기</Text>
                    </View>
                )}

                < Text style={styles.label}>메모</Text>
                <TextInput style={styles.input} multiline onChangeText={setMemo} value={memo} />

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>저장</Text>
                </TouchableOpacity>
            </View>

        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonCircle: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    radioButtonSelected: {
        backgroundColor: 'black',
    },
    picker: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    uploadButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default AddItem;