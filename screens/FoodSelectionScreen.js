// src/screens/FoodSelectionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import FoodItem from '../components/FoodItem';
import NutritionBar from '../components/NutritionBar';
import foodData from '../asset/foodData.json';
import { styles } from '../styles/styles';

export default function FoodSelectionScreen() {
  const [basket, setBasket] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [nutritionGoals, setNutritionGoals] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // เพิ่ม state สำหรับคำค้นหา

  const defaultGoals = {
    calories: 2000,
    protein: 60,
    fat: 70,
    carbs: 260,
    sodium: 2000,
    sugar: 50,
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadNutritionGoals = async () => {
        try {
          const storedGoals = await AsyncStorage.getItem('nutritionGoals');
          if (storedGoals) {
            setNutritionGoals(JSON.parse(storedGoals));
          } else {
            setNutritionGoals(null);
          }
        } catch (error) {
          console.error('Error loading nutrition goals:', error);
        }
      };
      loadNutritionGoals();
    }, [])
  );

  const categories = ['ทั้งหมด', 'อาหารหลัก', 'อาหารว่าง', 'เครื่องดื่ม'];

  // กรองข้อมูลอาหารตามหมวดหมู่และคำค้นหา
  const filteredFoodData = foodData
    .filter((food) => selectedCategory === 'ทั้งหมด' || food.category === selectedCategory)
    .filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const addToBasket = (food) => {
    const existingItem = basket.find((item) => item.food.id === food.id);
    if (existingItem) {
      setBasket(
        basket.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setBasket([...basket, { food, quantity: 1 }]);
    }
  };

  const removeFromBasket = (foodId) => {
    const existingItem = basket.find((item) => item.food.id === foodId);
    if (existingItem.quantity > 1) {
      setBasket(
        basket.map((item) =>
          item.food.id === foodId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setBasket(basket.filter((item) => item.food.id !== foodId));
    }
  };

  const totalNutrition = basket.reduce(
    (acc, item) => ({
      calories: acc.calories + item.food.calories * item.quantity,
      protein: acc.protein + item.food.nutrition.protein * item.quantity,
      fat: acc.fat + item.food.nutrition.fat * item.quantity,
      carbs: acc.carbs + item.food.nutrition.carbs * item.quantity,
      sodium: acc.sodium + item.food.nutrition.sodium * item.quantity,
      sugar: acc.sugar + item.food.nutrition.sugar * item.quantity,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0, sugar: 0 }
  );

  const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0);

  const consumeFood = async () => {
    if (basket.length === 0) return;

    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('th-TH'),
      items: basket,
      totalNutrition,
    };

    try {
      const existingHistory = await AsyncStorage.getItem('foodHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.push(newEntry);
      await AsyncStorage.setItem('foodHistory', JSON.stringify(history));
      setBasket([]);
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const goals = nutritionGoals || defaultGoals;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>เลือกอาหารจาก 7-Eleven</Text>
      <Text style={styles.subHeader}>เลือกแล้ว: {totalItems} ชิ้น</Text>

      {/* ช่องค้นหา */}
      <TextInput
        style={styles.searchInput}
        placeholder="ค้นหาเมนูอาหาร..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />

      {/* แถบหมวดหมู่ */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContentContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ส่วนแสดงเมนู (FlatList) */}
      <View style={styles.foodListContainer}>
        <FlatList
          data={filteredFoodData}
          renderItem={({ item }) => (
            <FoodItem
              food={item}
              onAdd={addToBasket}
              onRemove={removeFromBasket}
              quantity={
                basket.find((basketItem) => basketItem.food.id === item.id)?.quantity || 0
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* ส่วนโภชนาการรวม */}
      <View style={styles.nutritionContainer}>
        <Text style={styles.subHeader}>โภชนาการรวมวันนี้</Text>
        <NutritionBar label="แคลอรี่" value={totalNutrition.calories} max={goals.calories} unit="kcal" />
        <NutritionBar label="โปรตีน" value={totalNutrition.protein} max={goals.protein} unit="g" />
        <NutritionBar label="ไขมัน" value={totalNutrition.fat} max={goals.fat} unit="g" />
        <NutritionBar label="คาร์โบไฮเดรต" value={totalNutrition.carbs} max={goals.carbs} unit="g" />
        <NutritionBar label="โซเดียม" value={totalNutrition.sodium} max={goals.sodium} unit="mg" />
        <NutritionBar label="น้ำตาล" value={totalNutrition.sugar} max={goals.sugar} unit="g" />
      </View>

      {/* ปุ่มบริโภค */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, basket.length === 0 && styles.disabledButton]}
          onPress={consumeFood}
          disabled={basket.length === 0}
        >
          <Text style={styles.buttonText}>บริโภค</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}