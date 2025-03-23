// src/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodSelectionScreen from '../screens/FoodSelectionScreen';
import TDEEScreen from '../screens/TDEEScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // ปิด navigation header เพื่อลดช่องว่างด้านบน
        tabBarStyle: {
          height: 60, // ลดความสูงของแถบนำทาง
          paddingBottom: 5, // ลดช่องว่างด้านล่างของแถบนำทาง
          paddingTop: 5, // ลดช่องว่างด้านบนของแถบนำทาง
          borderTopWidth: 0, // ลบเส้นขอบด้านบนของแถบนำทาง
        },
        tabBarActiveTintColor: '#007AFF', // สีของแท็บที่เลือก
        tabBarInactiveTintColor: 'gray', // สีของแท็บที่ไม่ได้เลือก
      }}
    >
      <Tab.Screen
        name="Food"
        component={FoodSelectionScreen}
        options={{
          title: 'เลือกอาหาร',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TDEE"
        component={TDEEScreen}
        options={{
          title: 'คำนวณ TDEE',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'ประวัติ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}