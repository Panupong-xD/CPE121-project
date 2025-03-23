// src/screens/TDEEScreen.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import TDEEForm from '../components/TDEEForm';
import { styles } from '../styles/styles';

export default function TDEEScreen() {
  const [tdee, setTdee] = useState(null);
  const [activity, setActivity] = useState('sedentary'); // เก็บระดับกิจกรรม

  const calculateTDEE = ({ age, weight, height, gender, activity }) => {
    // คำนวณ BMR (ใช้สูตร Mifflin-St Jeor)
    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    // ค่าระดับกิจกรรม
    const activityLevels = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };
    const calculatedTdee = bmr * activityLevels[activity];
    setTdee(calculatedTdee);
    setActivity(activity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>คำนวณ TDEE</Text>
      <TDEEForm onCalculate={calculateTDEE} />
      {tdee !== null && !isNaN(tdee) && (
        <View>
          <Text style={styles.subHeader}>สำหรับคนควบคุมน้ำหนัก: {Math.round(tdee)} kcal</Text>
          <Text style={styles.subHeader}>สำหรับคนลดน้ำหนัก: {Math.round(tdee - 500)} - {Math.round(tdee - 200)} kcal</Text>
          {/* แสดง "เพิ่มกล้าม" เฉพาะเมื่อเลือกโหมด Active */}
          {activity === 'active' && (
            <Text>สำหรับคนเพิ่มกล้าม: {Math.round(tdee + 200)} - {Math.round(tdee + 500)} kcal</Text>
          )}
          {/* เพิ่มคำแนะนำสำหรับโหมด Sedentary */}
          {activity === 'sedentary' && (
            <Text style={styles.warningText}>
              คุณอยู่ในโหมดไม่ออกกำลังกาย การเพิ่มแคลอรี่เพื่อเพิ่มกล้ามอาจไม่เหมาะสม
            </Text>
          )}
        </View>
      )}
    </View>
  );
}