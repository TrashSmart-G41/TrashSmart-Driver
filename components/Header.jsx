import React, { useContext } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const profileImagePlaceholder = require('../assets/images/me.jpg'); // Path to dummy profile image
const logoPlaceholder = require('../assets/images/logo.png'); // Path to dummy logo image

export default function Header() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);  // Access theme from ThemeContext

  return (
    <SafeAreaView className={` ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="flex-row justify-between items-center px-4 pt-12">
        <TouchableOpacity onPress={() => router.push('/Profile/profileedit')}>
          <Feather name="menu" size={24} color={theme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
        <Image source={logoPlaceholder} className="w-40 h-10" resizeMode="contain" />
        <TouchableOpacity onPress={() => router.push('/Profile/profile')}>
          <Image source={{ uri: user?.profileURL || 'https://via.placeholder.com/100' }} className="w-14 h-14 rounded-full" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
