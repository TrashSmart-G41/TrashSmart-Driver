import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

export default function CollectionMap() {
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <View className={`flex-1 justify-center items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <Text className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        Collection Map Page
      </Text>
    </View>
  );
}
