import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';

const allData = [
  { date: '04-07-2024', route: 'Reid Ave - Kirulapone', pickups: 24 },
  { date: '03-07-2024', route: 'Reid Ave - Kirulapone', pickups: 30 },
  { date: '02-07-2024', route: 'Reid Ave - Kirulapone', pickups: 20 },
  { date: '01-07-2024', route: 'Reid Ave - Kirulapone', pickups: 18 },
  { date: '30-06-2024', route: 'Reid Ave - Kirulapone', pickups: 22 },
  { date: '29-06-2024', route: 'Reid Ave - Kirulapone', pickups: 25 },
  { date: '28-06-2024', route: 'Reid Ave - Kirulapone', pickups: 19 },
];

const lastMonthData = [
  { date: '30-06-2024', route: 'Reid Ave - Kirulapone', pickups: 22 },
  { date: '29-06-2024', route: 'Reid Ave - Kirulapone', pickups: 25 },
  { date: '28-06-2024', route: 'Reid Ave - Kirulapone', pickups: 19 },
];

const sevenDaysData = [
  { date: '04-07-2024', route: 'Reid Ave - Kirulapone', pickups: 24 },
  { date: '03-07-2024', route: 'Reid Ave - Kirulapone', pickups: 30 },
  { date: '02-07-2024', route: 'Reid Ave - Kirulapone', pickups: 20 },
  { date: '01-07-2024', route: 'Reid Ave - Kirulapone', pickups: 18 },
  { date: '30-06-2024', route: 'Reid Ave - Kirulapone', pickups: 22 },
  { date: '29-06-2024', route: 'Reid Ave - Kirulapone', pickups: 25 },
  { date: '28-06-2024', route: 'Reid Ave - Kirulapone', pickups: 19 },
];

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View className="flex-row justify-between mb-4">
      <View className="flex-row items-center">
        <MaterialIcons name="location-on" size={24} color={theme === 'dark' ? 'yellow' : 'black'} />
        <View className="ml-2">
          <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Reid Avenue</Text>
          <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>top location</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <FontAwesome name="check-circle" size={24} color="green" />
        <View className="ml-2">
          <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>40 trips</Text>
          <Text className={`text-sm p-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>completed</Text>
        </View>
      </View>
    </View>
  );
};

const FilterTabs = ({ selectedFilter, onFilterChange }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View className="flex-row justify-around mb-4">
      {['All', '07 Days', 'Last Month'].map((filter) => (
        <TouchableOpacity
          key={filter}
          className={`py-2 px-4 rounded-full ${
            selectedFilter === filter ? 'bg-green-600' : 'bg-green-400'
          }`}
          onPress={() => onFilterChange(filter)}
        >
          <Text className={`text-white text-center ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Stats = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [data, setData] = useState(allData);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    switch (filter) {
      case 'All':
        setData(allData);
        break;
      case '07 Days':
        setData(sevenDaysData);
        break;
      case 'Last Month':
        setData(lastMonthData);
        break;
      default:
        setData(allData);
    }
  };

  return (
    <ScrollView className={`flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-4`}>
      <Header />
      <FilterTabs selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />
      {data.map((item, index) => (
        <View key={index} className={`flex-row justify-between items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-3 rounded-lg mb-2`}>
          <Text className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} flex-1`}>{item.date}</Text>
          <Text className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} flex-1` }>{item.route}</Text>
          <Text className={`text-base ${theme === 'dark' ? 'text-green-500' : 'text-green-600'} text-right flex-1`}>{item.pickups} pickups</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Stats;
