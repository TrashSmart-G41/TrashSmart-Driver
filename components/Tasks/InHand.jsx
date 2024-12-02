import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import BACKEND_URL from '../../constants/config';

export default function InHand() {
  const { theme } = useContext(ThemeContext); // Access the current theme
  const [dispatchData, setDispatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for pull-down refresh
  const router = useRouter();

  // Fetch data from API
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      const response = await axios.get(`${BACKEND_URL}/api/v1/dispatch/driver/${userId}/NEW`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDispatchData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the refresh indicator
    }
  };

  // Pull-to-refresh handler
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(); // Fetch data again
  };

  // Auto-refresh when visiting the screen
  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme === 'dark' ? '#34D399' : '#46AA62'} />
      </View>
    );
  }

  return (
    <ScrollView
      className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
      contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[theme === 'dark' ? '#34D399' : '#46AA62']} // Android refresh indicator color
          tintColor={theme === 'dark' ? '#34D399' : '#46AA62'} // iOS refresh indicator color
        />
      }
    >
      {dispatchData.map((dispatch) => (
        <TouchableOpacity
          key={dispatch.id}
          onPress={() =>
            router.push({
              pathname: dispatch.dispatchType === 'ORGANIZATION' ? '/Maps/Maps' : '/Maps/MapsHousehold',
              params: { dispatch: JSON.stringify(dispatch) },
            })
          }
          className={`rounded-md shadow-md my-2 p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-1 mr-2">
              <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {`Dispatch Type: ${dispatch.dispatchType}`}
              </Text>
              <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {`Date: ${new Date(dispatch.dateTime).toLocaleString()}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {dispatchData.map((dispatch) => (
        <TouchableOpacity
          key={`simulation-${dispatch.id}`}
          onPress={() =>
            router.push({
              pathname:
                dispatch.dispatchType === 'ORGANIZATION'
                  ? '/Maps/SimulationOriginalOrg'
                  : '/Maps/SimulationOriginalHouse',
              params: { dispatch: JSON.stringify(dispatch) },
            })
          }
          className={`rounded-md shadow-md my-2 p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-1 mr-2">
              <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {`Simulate ${dispatch.dispatchType} Dispatch`}
              </Text>
              <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {`Start simulation for ${dispatch.dispatchType}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
