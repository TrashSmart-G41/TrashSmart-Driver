import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BACKEND_URL from '../../constants/config';

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const DISPATCH_TYPES = {
  ORGANIZATION: 'ORGANIZATION',
  HOUSEHOLD: 'HOUSEHOLD',
};

export default function Schedule() {
  const { theme } = useContext(ThemeContext);
  const [schedules, setSchedules] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const router = useRouter();
  const locationCache = {};

  const fetchLocationName = async (latitude, longitude) => {
    const cacheKey = `${latitude},${longitude}`;
    if (locationCache[cacheKey]) return locationCache[cacheKey]; // Return cached data if available

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
      );
      const locationName =
        response.data.results.length > 0 ? response.data.results[0].formatted_address : 'Unknown Location';
      locationCache[cacheKey] = locationName; // Cache the result
      return locationName;
    } catch (error) {
      console.error('Error fetching location name:', error.message);
      return 'Unknown Location';
    }
  };

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('jwtToken');

      if (!userId || !token) {
        Alert.alert('Error', 'User ID or token is missing.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/dispatch/driver/${userId}/NEW`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dispatchData = response.data;

      if (!dispatchData || dispatchData.length === 0) {
        Alert.alert('No schedules available', 'No schedules were found for today.');
        setSchedules([]);
        return;
      }

      const formattedSchedules = await Promise.all(
        dispatchData.map(async (dispatch) => {
          if (dispatch.dispatchType === DISPATCH_TYPES.ORGANIZATION) {
            const locationNames = await Promise.all(
              dispatch.wasteCollectionRequestList.map(async (item) => {
                const locationName = await fetchLocationName(item.latitude, item.longitude);
                return { ...item, locationName };
              })
            );
            return {
              id: dispatch.id,
              wasteType: dispatch.wasteType || 'Unknown',
              dispatchType: dispatch.dispatchType || 'Unknown',
              wasteCollectionRequestList: locationNames,
            };
          } else if (dispatch.dispatchType === DISPATCH_TYPES.HOUSEHOLD) {
            return {
              id: dispatch.id,
              wasteType: dispatch.wasteType || 'Unknown',
              dispatchType: dispatch.dispatchType || 'Unknown',
              route: dispatch.route,
            };
          }
          return null;
        }).filter(Boolean)
      );

      setSchedules(formattedSchedules);
    } catch (error) {
      console.error('Error fetching schedules:', error.response || error.message);
      Alert.alert('Error', 'Failed to load schedules.');
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the refresh indicator
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSchedules();
  };

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme === 'dark' ? '#34D399' : '#46AA62'} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[theme === 'dark' ? '#34D399' : '#46AA62']} // Android refresh indicator color
          tintColor={theme === 'dark' ? '#34D399' : '#46AA62'} // iOS refresh indicator color
        />
      }
    >
      {schedules === null || schedules.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            No schedules available
          </Text>
        </View>
      ) : (
        schedules.map((schedule) => (
          <TouchableOpacity
            key={schedule.id}
            onPress={() =>
              router.push({
                pathname:
                  schedule.dispatchType === DISPATCH_TYPES.ORGANIZATION
                    ? '/Maps/Maps'
                    : '/Maps/MapsHousehold',
                params: { dispatch: JSON.stringify(schedule) },
              })
            }
            style={{
              backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
              borderRadius: 8,
              marginBottom: 10,
              padding: 15,
            }}
          >
            <Text style={{ fontWeight: 'bold', color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>
              {`Main Schedule ID: ${schedule.id}`}
            </Text>
            <Text style={{ color: theme === 'dark' ? '#A0A0A0' : '#666666' }}>
              {`Waste Type: ${schedule.wasteType}`}
            </Text>
            <Text style={{ color: theme === 'dark' ? '#A0A0A0' : '#666666' }}>
              {`Dispatch Type: ${schedule.dispatchType}`}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
