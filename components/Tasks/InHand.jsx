import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

const truckNumberPlaceholder = "Truck No: CAC-9474";
const locationPlaceholder = "Kirulapone Reid Avenue";
const timePlaceholder = "10.00 P.M";

export default function InHand() {
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <ScrollView
      className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
      contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
    >
    <View className={`rounded-md shadow-md my-0 p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-1 mr-2">
          <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {truckNumberPlaceholder}
          </Text>
          <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {locationPlaceholder}
          </Text>
        </View>
        <Text className={`text-sm w-20 text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {timePlaceholder}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-row items-center bg-green-600 rounded-md py-2 px-3 flex-1 mr-2">
          <Ionicons name="checkmark-circle-outline" size={20} color="white" />
          <Text className="text-white ml-2 text-sm flex-1">Mark As Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`flex-row items-center border rounded-md py-2 px-3 ${theme === 'dark' ? 'border-green-400' : 'border-green-600'}`}>
          <Ionicons name="call-outline" size={20} color={theme === 'dark' ? '#34D399' : '#46AA62'} />
          <Text className={`ml-2 text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}
