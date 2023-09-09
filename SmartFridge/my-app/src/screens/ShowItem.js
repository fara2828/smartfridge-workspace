import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShowItem = ({ route }) => {
    const { category, count, division, purchaseDate, expiryDate, store, memo } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>아이템 상세 정보</Text>
            <Text style={styles.label}>구분: {division}</Text>
            <Text style={styles.label}>카테고리: {category}</Text>
            <Text style={styles.label}>갯수: {count}</Text>
            <Text style={styles.label}>구매일자: {purchaseDate.toLocaleDateString()}</Text>
            <Text style={styles.label}>유통기한: {expiryDate.toLocaleDateString()}</Text>
            <Text style={styles.label}>구매처: {store}</Text>
            <Text style={styles.label}>메모:</Text>
            <Text style={styles.memo}>{memo}</Text>
        </View>
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
        marginVertical: 5,
    },
    memo: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
});

export default ShowItem;
