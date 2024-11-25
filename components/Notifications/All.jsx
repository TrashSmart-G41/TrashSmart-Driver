import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext for dark mode

const testData = [
  { id: 1, title: 'New dispatch request', date: '04 Jun 2024', status: 'Unread' },
  { id: 2, title: 'Schedule updated', date: '03 Jun 2024', status: 'Unread' },
  { id: 3, title: 'Trip completed', date: '02 Jun 2024', status: 'Unread' },
  { id: 4, title: 'Payment received', date: '01 Jun 2024', status: 'Unread' },
];

export default function All() {
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <ScrollView
      className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
      contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
    >
      {testData.map((item) => (
        <View
          key={item.id}
          className={`flex-row justify-between items-center p-4 rounded-lg mb-2 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        >
          <View className="flex-1">
            <Text className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {item.title}
            </Text>
            <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.date}
            </Text>
          </View>
          <Text className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-400'}`}>
            {item.status}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
