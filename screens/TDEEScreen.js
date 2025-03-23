// src/screens/TDEEScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TDEEForm from '../components/TDEEForm';
import { styles } from '../styles/styles';


export default function TDEEScreen() {
  const [tdee, setTdee] = useState(null);
  const [nutritionGoals, setNutritionGoals] = useState(null);

  const calculateTDEE = ({ age, weight, height, gender }) => {
    // คำนวณ BMR (ใช้สูตร Mifflin-St Jeor)
    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    // ไม่ใช้ระดับกิจกรรม คูณด้วยค่าคงที่ (สมมติใช้ 1.2 สำหรับทุกคน)
    const calculatedTdee = bmr * 1.2;
    setTdee(calculatedTdee);

    // คำนวณค่าโภชนาการจาก TDEE
    const protein = weight * 1.0; // 1.0 g/kg
    const carbsCalories = calculatedTdee * 0.6; // 60% ของ TDEE
    const carbs = carbsCalories / 4; // 1 กรัมคาร์โบไฮเดรต = 4 kcal
    const fatCalories = calculatedTdee * 0.3; // 30% ของ TDEE
    const fat = fatCalories / 9; // 1 กรัมไขมัน = 9 kcal

    const goals = {
      calories: calculatedTdee,
      protein: protein,
      carbs: carbs,
      fat: fat,
      sodium: 2000,
      sugar: 50,
    };
    setNutritionGoals(goals);
  };

  const saveNutritionGoals = async () => {
    if (!nutritionGoals) {
      Alert.alert('คำเตือน', 'กรุณาคำนวณ TDEE ก่อน!');
      return;
    }
    try {
      await AsyncStorage.setItem('nutritionGoals', JSON.stringify(nutritionGoals));
      Alert.alert('สำเร็จ', 'บันทึกข้อมูล TDEE เพื่ออ้างอิงเรียบร้อยแล้ว');
    } catch (error) {
      console.error('Error saving nutrition goals:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้');
    }
  };

  const resetNutritionGoals = async () => {
    try {
      await AsyncStorage.removeItem('nutritionGoals');
      setNutritionGoals(null);
      setTdee(null);
      Alert.alert('สำเร็จ', 'รีเซ็ตการอ้างอิง TDEE เรียบร้อยแล้ว');
    } catch (error) {
      console.error('Error resetting nutrition goals:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถรีเซ็ตข้อมูลได้');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>คำนวณ TDEE</Text>
      <TDEEForm onCalculate={calculateTDEE} />
      {tdee !== null && !isNaN(tdee) && (
        <View>     
          {nutritionGoals && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.subHeader}>เป้าหมายโภชนาการต่อวัน:</Text>
              <Text>แคลอรี่: {Math.round(nutritionGoals.calories)} kcal</Text>
              <Text>โปรตีน: {Math.round(nutritionGoals.protein)} g</Text>
              <Text>ไขมัน: {Math.round(nutritionGoals.fat)} g</Text>
              <Text>คาร์โบไฮเดรต: {Math.round(nutritionGoals.carbs)} g</Text>
              <Text>โซเดียม: {nutritionGoals.sodium} mg</Text>
              <Text>น้ำตาล: {nutritionGoals.sugar} g</Text>
              <Text style={styles.subHeader}>หมายเหตุ:</Text>
              <Text>- เพิ่มกล้าม/น้ำหนัก: +500 kcal</Text>
              <Text>- ลดน้ำหนัก: -500 kcal</Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <TouchableOpacity onPress={saveNutritionGoals} style={styles.button}>
              <Text style={styles.buttonText}>อ้างอิง TDEE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetNutritionGoals} style={[styles.button, { backgroundColor: '#FF3B30' }]}>
              <Text style={styles.buttonText}>รีเซ็ต</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}