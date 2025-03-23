// src/components/FoodItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function FoodItem({ food, onAdd, onRemove, quantity }) {
  return (
    <View style={styles.foodItem}>
      <Text>{food.name}</Text>
      <Text style={styles.caloriesText}>{food.calories} kcal</Text>

      <View style={styles.quantityContainer}>

        <TouchableOpacity
          onPress={() => onRemove(food.id)}
          style={[styles.button, quantity === 0 && styles.disabledButton]}
          disabled={quantity === 0}>
          <Text style={styles.buttonText}> - </Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={() => onAdd(food)} style={styles.button}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}