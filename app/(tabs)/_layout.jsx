import React, { useContext } from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

export default function TabLayout() {
  const { theme } = useContext(ThemeContext); // Access current theme

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.active,
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff', // Dark or Light background
          borderTopColor: theme === 'dark' ? '#333333' : '#cccccc', // Adjust border color
        },
        tabBarLabelStyle: {
          color: theme === 'dark' ? '#ffffff' : '#000000', // Label color changes in dark mode
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <Feather name="truck" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
