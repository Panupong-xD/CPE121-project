// src/screens/HistoryScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // เพิ่มการ import
import HistoryItem from '../components/HistoryItem';
import { styles } from '../styles/styles';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  // โหลดประวัติใหม่ทุกครั้งที่หน้าจอถูกโฟกัส
  useFocusEffect(
    useCallback(() => {
      const loadHistory = async () => {
        try {
          const storedHistory = await AsyncStorage.getItem('foodHistory');
          if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
          } else {
            setHistory([]); // ถ้าไม่มีข้อมูล ให้ตั้งเป็น array ว่าง
          }
        } catch (error) {
          console.error('Error loading history:', error);
        }
      };
      loadHistory();
    }, [])
  );

  // ฟังก์ชันลบประวัติ
  const deleteHistoryItem = async (id) => {
    Alert.alert('ยืนยันการลบ', 'คุณต้องการลบรายการนี้หรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ลบ',
        onPress: async () => {
          const updatedHistory = history.filter((entry) => entry.id !== id);
          setHistory(updatedHistory);
          try {
            await AsyncStorage.setItem('foodHistory', JSON.stringify(updatedHistory));
          } catch (error) {
            console.error('Error deleting history:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ประวัติการกิน</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <HistoryItem entry={item} onDelete={() => deleteHistoryItem(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>ยังไม่มีประวัติ</Text>}
      />
    </View>
  );
}