import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, Octicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ThemeContext } from '../../context/ThemeContext'; // Assuming ThemeContext is available

// Placeholder data
const schedules = [
  {
    id: 1,
    title: "Cleaning Trip",
    route: "Reid Avenue",
    destination: "Kirulapone",
    time: "10.00 A.M",
  },
  {
    id: 2,
    title: "Cleaning Trip",
    route: "Town Hall",
    destination: "Slave Island",
    time: "2.00 P.M",
  }
];

const completedSchedules = [
  {
    id: 1,
    title: "Cleaning Trip",
    route: "Galleface",
    destination: "Wellawatta",
    time: "10.00 A.M",
  }
];

export default function Schedule() {
  const { theme } = useContext(ThemeContext); // Access current theme

  return (
    <View className={`w-[90%] h-[60%] rounded-lg p-3 mx-[5%] mt-9 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <Text className={`text-lg mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Today's Schedule
      </Text>
      <ScrollView className="flex-col">
        {schedules.map((schedule) => (
          <Link href="Tasks/CollectionMap" asChild key={schedule.id}>
            <TouchableOpacity className={`w-[90%] rounded-lg flex-row items-center p-3 my-3 mx-auto ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <MaterialCommunityIcons name="calendar-month-outline" size={24} color={theme === 'dark' ? "#C0C0C0" : "#6C6C7180"} className="mr-2" />
              <View className="flex-1 justify-center">
                <Text className={`text-md ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {schedule.title}
                </Text>
                <Text className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {schedule.route} <FontAwesome5 name="arrow-right" size={14} color={theme === 'dark' ? "#32D74B" : "#32D74B"} /> {schedule.destination} 
                  <FontAwesome name="circle" size={14} color={theme === 'dark' ? "#7ED957" : "#7ED957"} />
                </Text>
                <Text className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
                  {schedule.time}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>

      <Text className={`text-lg mt-4 mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Completed
      </Text>
      <ScrollView className="flex-col mb-5">
        {completedSchedules.map((schedule) => (
          <TouchableOpacity className={`w-[90%] rounded-lg flex-row items-center p-2 my-2 mx-auto ${theme === 'dark' ? 'bg-gray-700' : 'bg-[#F3FFF680]'}`} key={schedule.id}>
            <Octicons name="check" size={24} color="#7ED957" className="mr-2" />
            <View className="flex-1 justify-center">
              <Text className={`text-md ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {schedule.title}
              </Text>
              <Text className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {schedule.route} <FontAwesome5 name="arrow-right" size={14} color="#6C6C71" /> {schedule.destination}
              </Text>
              <Text className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
                {schedule.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
