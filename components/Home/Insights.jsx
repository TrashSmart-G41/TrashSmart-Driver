import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext'; // Assuming ThemeContext exists

const streakPlaceholder = "3 Days Streak";
const tripsCompletedPlaceholder = "40 Trips Completed";

export default function Insights() {
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <View className="items-center py-3">
      <View className={`w-[90%] rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <Text className={`text-sm mb-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          This week's insights
        </Text>
        <View className="flex-row justify-between">
          <View className={`w-[45%] h-24 rounded-lg justify-center items-center p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <MaterialCommunityIcons name="star-circle" size={24} color="#FFD800" />
            <Text className={`text-xs text-center mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {streakPlaceholder}
            </Text>
          </View>
          <View className={`w-[45%] h-24 rounded-lg justify-center items-center p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <AntDesign name="checkcircleo" size={24} color={theme === 'dark' ? 'white' : 'black'} />
            <Text className={`text-xs text-center mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {tripsCompletedPlaceholder}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
