// src/components/TDEEForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles';

export default function TDEEForm({ onCalculate }) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('sedentary');

  const handleSubmit = () => {
    if (!onCalculate) {
      console.log('onCalculate is not defined!');
      return;
    }
    console.log('Calculating TDEE...');
    onCalculate({ age: Number(age), weight: Number(weight), height: Number(height), gender, activity });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="อายุ (ปี)"
        onChangeText={setAge}
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="น้ำหนัก (กก.)"
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="ส่วนสูง (ซม.)"
        onChangeText={setHeight}
        keyboardType="numeric"
        placeholderTextColor="#999"
      />

      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
          <Picker.Item label="ชาย" value="male" />
          <Picker.Item label="หญิง" value="female" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker selectedValue={activity} onValueChange={setActivity} style={styles.picker}>
          <Picker.Item label="ไม่ออกกำลังกาย" value="sedentary" />
          <Picker.Item label="ออกกำลังกายน้อย (1-3 วัน/สัปดาห์)" value="light" />
          <Picker.Item label="ออกกำลังกายปานกลาง (4-5 วัน/สัปดาห์)" value="moderate" />
          <Picker.Item label="ออกกำลังกายหนัก (6-7 วัน/สัปดาห์)" value="active" />
        </Picker>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>คำนวณ</Text>
      </TouchableOpacity>
    </View>
  );
}