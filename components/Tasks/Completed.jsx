import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BACKEND_URL from '../../constants/config';

export default function Completed() {
  const { theme } = useContext(ThemeContext);
  const [householdDispatches, setHouseholdDispatches] = useState([]);
  const [organizationDispatches, setOrganizationDispatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCompletedDispatch = useCallback(async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem('jwtToken');
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/dispatch/driver/${userId}/COMPLETED`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;

      // Group data by dispatch type
      const household = data.filter((dispatch) => dispatch.dispatchType === 'HOUSEHOLD');
      const organization = data.filter((dispatch) => dispatch.dispatchType === 'ORGANIZATION');

      setHouseholdDispatches(household);
      setOrganizationDispatches(organization);
    } catch (error) {
      console.error('Error fetching completed dispatch data:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to load completed dispatch data.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  // Auto-refresh when visiting the screen
  useEffect(() => {
    fetchCompletedDispatch();
  }, [fetchCompletedDispatch]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme === 'dark' ? '#46AA62' : '#000'} />
      </View>
    );
  }

  return (
    <ScrollView
      className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
      contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchCompletedDispatch} />}
    >
      {/* Pull-to-refresh and Refresh Button */}
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: theme === 'dark' ? '#3B3B3B' : '#F5F5F5',
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 10,
        }}
        onPress={fetchCompletedDispatch}
      >
        <Text style={{ color: theme === 'dark' ? '#34D399' : '#46AA62', fontWeight: 'bold' }}>Refresh Dispatch Data</Text>
      </TouchableOpacity>

      {/* Household Dispatches */}
      {householdDispatches.length > 0 && (
        <View className="mb-6">
          <Text className={`font-bold text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Household Dispatches
          </Text>
          {householdDispatches.map((dispatch) => (
            <View
              key={dispatch.id}
              className={`rounded-lg mb-4 overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              <View className="flex-row justify-between items-center p-4">
                <View className="flex-1 pr-3">
                  <Text className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {`Dispatch ID: ${dispatch.id}`}
                  </Text>
                  <Text className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {`Status: ${dispatch.dispatchStatus}`}
                  </Text>
                  <Text className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {`Date: ${new Date(dispatch.dateTime).toLocaleString()}`}
                  </Text>
                </View>
              </View>
              <View className={`${theme === 'dark' ? 'bg-red-600' : 'bg-gray-300'} h-3`} />
              <View className="p-4">
                <Text className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Route Details:
                </Text>
                <Text className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {`Route: ${dispatch.route}`}
                </Text>
                <Text className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {`Waste Type: ${dispatch.wasteType}`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Organization Dispatches */}
      {organizationDispatches.length > 0 && (
        <View>
          <Text className={`font-bold text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Organization Dispatches
          </Text>
          {organizationDispatches.map((dispatch) => (
            <View
              key={dispatch.id}
              className={`rounded-lg mb-4 overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              <View className="flex-row justify-between items-center p-4">
                <View className="flex-1 pr-3">
                  <Text className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {`Dispatch ID: ${dispatch.id}`}
                  </Text>
                  <Text className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {`Status: ${dispatch.dispatchStatus}`}
                  </Text>
                  <Text className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {`Date: ${new Date(dispatch.dateTime).toLocaleString()}`}
                  </Text>
                </View>
              </View>
              <View className={`${theme === 'dark' ? 'bg-red-600' : 'bg-gray-300'} h-3`} />
              <View className="p-4">
                <Text className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Waste Collection Requests:
                </Text>
                {dispatch.wasteCollectionRequestList.map((request) => (
                  <View
                    key={request.id}
                    className={`rounded-md p-3 mb-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <Text className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {`Request ID: ${request.id}`}
                    </Text>
                    <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {`Volume: ${request.accumulatedVolume}L`}
                    </Text>
                    <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {`Waste Type: ${request.wasteType}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
