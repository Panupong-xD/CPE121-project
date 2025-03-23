// src/components/HistoryItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function HistoryItem({ entry, onDelete, isExpanded, onToggleExpand }) {
  return (
    <View style={styles.historyItem}>
      <TouchableOpacity style={styles.historyDetails} onPress={onToggleExpand}>
        <Text style={styles.historyItemText}>วันที่: {entry.date}</Text>
        {/* แสดงรายการอาหาร */}
        {entry.items.map((item, index) => (
          <Text key={index} style={styles.historyItemText}>
            {item.food.name} x {item.quantity}
          </Text>
        ))}
        {/* แสดงโภชนาการรวมเมื่อขยาย */}
        {isExpanded && (
          <View>
            <Text style={styles.historyNutritionText}>
              แคลอรี่: {entry.totalNutrition.calories} kcal
            </Text>
            <Text style={styles.historyNutritionText}>
              โปรตีน: {entry.totalNutrition.protein} g
            </Text>
            <Text style={styles.historyNutritionText}>
              ไขมัน: {entry.totalNutrition.fat} g
            </Text>
            <Text style={styles.historyNutritionText}>
              คาร์โบไฮเดรต: {entry.totalNutrition.carbs} g
            </Text>
            <Text style={styles.historyNutritionText}>
              โซเดียม: {entry.totalNutrition.sodium} mg
            </Text>
            <Text style={styles.historyNutritionText}>
              น้ำตาล: {entry.totalNutrition.sugar} g
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(entry.id)}
      >
        <Text style={styles.deleteButtonText}>ลบ</Text>
      </TouchableOpacity>
    </View>
  );
}