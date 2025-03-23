// src/components/NutritionBar.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export default function NutritionBar({ label, value, max, unit }) {
  const percentage = (value / max) * 100;
  let barColor = 'green';
  if (percentage > 150) barColor = 'red';
  else if (percentage > 100) barColor = 'yellow';

  return (
    <View style={styles.nutritionBar}>
      <Text>{label}: {value} {unit}</Text>
      <View style={[styles.bar, { width: `${Math.min(percentage, 100)}%`, backgroundColor: barColor }]} />
    </View>
  );
}