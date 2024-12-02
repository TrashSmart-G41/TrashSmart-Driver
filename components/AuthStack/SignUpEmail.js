import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode"; // Correct import
import { useRouter } from 'expo-router'; // Use useRouter for programmatic navigation
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext'; // Import UserContext
import BACKEND_URL from '../../constants/config';

const SignUpEmail = () => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { setUser } = useContext(UserContext); // Access setUser from UserContext
  const router = useRouter(); // Initialize router for manual redirection

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const decodedToken = jwtDecode(data.jwt);
        await AsyncStorage.setItem('jwtToken', data.jwt);
        await AsyncStorage.setItem('userId', decodedToken.userId.toString());

        // Fetch user details
        const userDetailsResponse = await fetch(`${BACKEND_URL}/api/v1/driver/${decodedToken.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.jwt}`,
          },
        });

        if (userDetailsResponse.ok) {
          const userDetails = await userDetailsResponse.json();

          // Store everything in AsyncStorage
          const fullUserDetails = {
            token: data.jwt,
            ...decodedToken,
            ...userDetails,
          };
          console.log('fullUserDetails:', fullUserDetails);
          await AsyncStorage.setItem('userDetails', JSON.stringify(fullUserDetails));

          // Update UserContext
          setUser(fullUserDetails);

          // Navigate to home
          router.replace('../(tabs)/home');
        } else {
          Alert.alert('Error', 'Failed to fetch user details.');
        }
      } else {
        Alert.alert('Login failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login error', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <View className='flex-1 bg-white'>
      <Image className='self-center mt-16' source={require('../../assets/png/logo.png')} resizeMode="contain" />

      <View className='items-center px-8 pt-24'>
        <Text className='text-xl font-bold'>Enter your email address</Text>
        <TextInput
          className='w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-5 py-1.5 mt-6 text-base'
          value={email}
          onChangeText={onChangeEmail}
          placeholder={'sample@domain.com'}
          keyboardType={'email-address'}
          autoCapitalize="none"
        />

        <Text className='text-xl font-bold mt-4'>Enter your password</Text>
        <View className='w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-5 py-1.5 mt-2 flex-row items-center'>
          <TextInput
            className='flex-1 text-base'
            value={password}
            onChangeText={onChangePassword}
            placeholder={'Enter your password'}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <MaterialCommunityIcons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="gray" />
          </Pressable>
        </View>

        <Pressable onPress={handleLogin} className='w-full h-11 justify-center bg-green-500 rounded-lg py-2.5 mt-5'>
          <Text className='text-white text-base text-center font-semibold'>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpEmail;
