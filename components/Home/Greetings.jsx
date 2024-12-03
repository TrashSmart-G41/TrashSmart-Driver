import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Fontisto, FontAwesome5, EvilIcons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function Greetings() {
  const { user } = useContext(UserContext); // Access user data from UserContext
  const { theme } = useContext(ThemeContext); // Access theme data from ThemeContext
  const location = user?.address || "No Address"; // Use user address if available, otherwise fallback
  console.log('User Context in Greetings:', user);

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

  const greetingData = getGreeting();
  console.log('User Context in Greetings:', user);
  return (
    <View className={`p-7 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="flex-row items-center mb-2">
        {greetingData.icon}
        <Text className={`text-xl font-semibold ml-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          {greetingData.greeting}, {user?.firstName || "Guest"}
        </Text>
      </View>
      <View className="flex-row items-center mb-4">
        <EvilIcons name="location" size={24} color="#32D74B" className="mr-3" />
        <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {location}
        </Text>
      </View>
      <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {user?.email || "No email available"}
      </Text>
      {user?.phone && (
        <Text className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Contact: {user.phone}
        </Text>
      )}
    </View>
  );
}
