// src/screens/HistoryScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HistoryItem from '../components/HistoryItem';
import { styles } from '../styles/styles';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // โหลดข้อมูลใหม่ทุกครั้งที่หน้าจอถูกโฟกัส
  useFocusEffect(
    React.useCallback(() => {
      const loadHistory = async () => {
        try {
          const storedHistory = await AsyncStorage.getItem('foodHistory');
          if (storedHistory) {
            const parsedHistory = JSON.parse(storedHistory);
            // กรองเฉพาะประวัติของวันนี้
            const today = new Date().toLocaleDateString('th-TH');
            const todayHistory = parsedHistory.filter((entry) => entry.date === today);
            setHistory(todayHistory);
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

  const deleteEntry = async (id) => {
    // แสดง Alert เพื่อยืนยันก่อนลบ
    Alert.alert(
      'ยืนยันการลบ',
      'คุณแน่ใจหรือไม่ว่าต้องการลบประวัตินี้?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel', // ปุ่มยกเลิก
        },
        {
          text: 'ตกลง',
          style: 'destructive', // ปุ่มตกลง (สีแดงใน iOS)
          onPress: async () => {
            try {
              const storedHistory = await AsyncStorage.getItem('foodHistory');
              const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];
              const updatedHistory = parsedHistory.filter((entry) => entry.id !== id);
              await AsyncStorage.setItem('foodHistory', JSON.stringify(updatedHistory));
              // อัปเดต state หลังจากลบ
              const today = new Date().toLocaleDateString('th-TH');
              const todayHistory = updatedHistory.filter((entry) => entry.date === today);
              setHistory(todayHistory);
              Alert.alert('สำเร็จ', 'ลบประวัติเรียบร้อยแล้ว');
            } catch (error) {
              console.error('Error deleting history entry:', error);
              Alert.alert('ข้อผิดพลาด', 'ไม่สามารถลบประวัติได้');
            }
          },
        },
      ],
      { cancelable: true } // อนุญาตให้กดนอก Alert เพื่อยกเลิก
    );
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ประวัติการบริโภค (วันนี้)</Text>
      {history.length === 0 ? (
        <Text style={styles.subHeader}>ไม่มีประวัติการบริโภคในวันนี้</Text>
      ) : (
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <HistoryItem
              entry={item}
              onDelete={deleteEntry}
              isExpanded={expandedId === item.id}
              onToggleExpand={() => toggleExpand(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}