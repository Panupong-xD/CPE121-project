// src/components/HistoryItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function HistoryItem({ entry, onDelete }) {
  return (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.subHeader}>วันที่: {entry.date}</Text>
        {entry.items.map((item, index) => (
          <Text key={index}>
            {item.food.name} x {item.quantity}
          </Text>
        ))}
        <Text>แคลอรี่รวม: {entry.totalNutrition.calories} kcal</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>ลบ</Text>
      </TouchableOpacity>
    </View>
  );
}