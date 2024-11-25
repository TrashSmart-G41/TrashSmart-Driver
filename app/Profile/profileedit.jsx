import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Switch } from 'react-native';
import { Ionicons, Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await fetch('http://192.168.8.50:8081/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear user data from context and AsyncStorage
        setUser(null);
        await AsyncStorage.clear();

        // Navigate to the login screen
        router.replace('../(AuthStack)/SignUpEmail');
      } else {
        Alert.alert('Error', 'Failed to log out');
      }
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'An error occurred during logout');
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="px-5">
        <View className="flex-row items-center mb-4 mt-11">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? 'white' : 'black'} />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-30 h-10 mx-auto"
            resizeMode="contain"
          />
        </View>

        <View className={`flex-row items-center mb-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-4 rounded-lg`}>
          <Image source={{ uri: user?.profileImage || 'https://via.placeholder.com/100' }} className="w-15 h-15 rounded-full" />
          <View className="flex-1 ml-4">
            <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{user?.firstName || 'Guest'}</Text>
            <Text className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user?.userEmail || 'No email'}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('Profile/profile')}>
            <Ionicons name="chevron-forward" size={24} color={theme === 'dark' ? 'gray' : 'black'} />
          </TouchableOpacity>
        </View>

        <View className={`p-4 rounded-lg mb-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <TouchableOpacity className="flex-row items-center py-2.5" onPress={() => router.push('/Language')}>
            <Feather name="globe" size={24} color="#32D74B" />
            <Text className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Preferable Language</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>

          <View className="flex-row items-center py-2.5">
            <Text className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Dark Mode</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>

          <TouchableOpacity className="flex-row items-center py-2.5" onPress={() => router.push('/ResetPassword')}>
            <MaterialIcons name="lock-reset" size={24} color="#32D74B" />
            <Text className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Reset Password</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-2.5" onPress={() => router.push('/Security')}>
            <FontAwesome5 name="lock" size={24} color="#32D74B" />
            <Text className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Security</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View className={`p-4 rounded-lg mb-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <TouchableOpacity className="flex-row items-center py-2.5" onPress={() => router.push('/ContactSupport')}>
            <Feather name="help-circle" size={24} color="#32D74B" />
            <Text className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Contact Support Team</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-2.5" onPress={() => router.push('/TermsOfService')}>
            <Feather name="file-text" size={24} color="#32D74B" />
            <Text className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-2.5" onPress={() => router.push('/PrivacyPolicy')}>
            <Feather name="shield" size={24} color="#32D74B" />
            <Text className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-2.5" onPress={() => router.push('/RateUs')}>
            <Feather name="star" size={24} color="#32D74B" />
            <Text className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Rate Us</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-green-500 p-4 rounded-lg items-center mt-5" onPress={handleLogout}>
          <Text className="text-white text-base font-bold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
