import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

export default function Cancelled() {
  const { theme } = useContext(ThemeContext); // Access the current theme

  const truckNumberPlaceholder = "Truck No: PH-2547";
  const routePlaceholder = "Reid Avenue - Kirulapone";
  const timePlaceholder = "10:00 A.M";

  return (
    <ScrollView
      className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
      contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
    >
    <View className={`rounded-lg mx-0 overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <View className="flex-row justify-between items-center p-4">
        <View className="flex-1 pr-3">
          <Text className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {truckNumberPlaceholder}
          </Text>
          <Text className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {routePlaceholder}
          </Text>
        </View>
        <Text className={`font-bold text-lg ml-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {timePlaceholder}
        </Text>
      </View>
      <View className={`${theme === 'dark' ? 'bg-red-600' : 'bg-gray-300'} h-3`} />
    </View>
    </ScrollView>
  );
}
