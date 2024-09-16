import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext for dark mode support

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); // Access the current theme (dark/light)

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <Header title="Map Screen" />
      
      {/* MapView */}
      <MapView
        style={{ width: width, height: height * 0.7 }}
        initialRegion={{
          latitude: 6.9271, // Example coordinates, replace with your own
          longitude: 79.8612,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Markers and Polyline */}
        <Marker coordinate={{ latitude: 6.9271, longitude: 79.8612 }} title="Start" />
        <Marker coordinate={{ latitude: 6.9310, longitude: 79.8612 }} title="End" />
        <Polyline
          coordinates={[
            { latitude: 6.9271, longitude: 79.8612 },
            { latitude: 6.9310, longitude: 79.8612 },
          ]}
          strokeColor="#32D74B"
          strokeWidth={4}
        />
      </MapView>

      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={{
          position: 'absolute', 
          top: 100, // Adjust this value based on how high you want the button
          left: 20,
          zIndex: 10, // Ensures the button is above the map
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <View className={`absolute bottom-0 w-full h-[30%] p-5 rounded-t-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <View className="items-center">
          <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>10 collections left</Text>
          <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-5`}>Reid Avenue - Kirulapone</Text>
          <View className="w-full items-center">
            <View className="w-[90%] h-1 bg-gray-300 rounded-full mb-5">
              <View className="w-[70%] h-full bg-green-500 rounded-full"></View>
            </View>
            <View className="flex-row items-center">
              <Image
                source={require('../../assets/images/tasks.png')} 
                className="w-6 h-6 mr-2"
              />
              <Text className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} mr-2`}>70%</Text>
              <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Next pickup at</Text>
              <Text className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} ml-2`}>University of Colombo</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;
