import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Fontisto, FontAwesome5, EvilIcons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function Greetings() {
  const { user } = useContext(UserContext); // Access user data from UserContext
  const { theme } = useContext(ThemeContext); // Access theme data from ThemeContext
  const location = "Reid Avenue, Colombo 7"; // This will be fetched from the database
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return {
        greeting: "Good Morning",
        icon: <FontAwesome5 name="sun" size={24} color={theme === 'dark' ? "#FFD700" : "#FFA500"} />
      };
    } else if (currentHour < 18) {
      return {
        greeting: "Good Afternoon",
        icon: <FontAwesome5 name="cloud-sun" size={24} color={theme === 'dark' ? "#FFD700" : "#FFA500"} />
      };
    } else {
      return {
        greeting: "Good Evening",
        icon: <FontAwesome5 name="moon" size={24} color={theme === 'dark' ? "#FFF" : "#FFA500"} />
      };
    }
  };

  const greetingData = getGreeting(); // Destructure the greeting and icon

  return (
    <View className={`p-7 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="flex-row items-center mb-2">
        {greetingData.icon}
        </View>
      {/* <View className="flex-row justify-end items-center mb-5">
        <Fontisto name="world-o" size={24} color={theme === 'dark' ? 'white' : 'black'} className="mr-10" />
        <FontAwesome name="moon-o" size={28} color={theme === 'dark' ? 'white' : 'black'} className="mr-4" />
      </View> */}
      <Text className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      {greetingData.greeting}, {user?.firstName || "Guest"}
      </Text>
      <View className="flex-row items-center">
        <EvilIcons name="location" size={24} color="#32D74B" className="mr-3" />
        <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {location}
        </Text>
      </View>
    </View>
  );
}
