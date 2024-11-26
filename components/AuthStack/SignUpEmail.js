import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode"; // Correct import
import { useRouter } from 'expo-router'; // Use useRouter for programmatic navigation
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext'; // Import UserContext

const SignUpEmail = () => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext); // Access setUser from UserContext
  const router = useRouter(); // Initialize router for manual redirection

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8081/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.jwt) {
          // Decode the JWT to extract the role and other details
          const decodedToken = jwtDecode(data.jwt);
          console.log(decodedToken); // Log the decoded token to see its contents

          // Store JWT token and user details in AsyncStorage (optional)
          await AsyncStorage.setItem('jwtToken', data.jwt);
          await AsyncStorage.setItem('userRole', decodedToken.role);
          await AsyncStorage.setItem('userEmail', decodedToken.sub);
          await AsyncStorage.setItem('tokenExpiry', decodedToken.exp.toString());
          await AsyncStorage.setItem('userId', decodedToken.userId.toString());

          // Fetch user details using the userId and store in UserContext
          const userDetailsResponse = await fetch(`http://10.0.2.2:8081/api/v1/driver/${decodedToken.userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.jwt}`,
            },
          });

          if (userDetailsResponse.ok) {
            const userDetails = await userDetailsResponse.json();

            // Set user data in context
            setUser({
              token: data.jwt,
              userRole: decodedToken.role,
              userEmail: decodedToken.sub,
              userId: decodedToken.userId,
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              email: userDetails.email,
              phone: userDetails.contactNo,
              address: userDetails.address,
              role: userDetails.role,
              dob: userDetails.dob,
              profileImage: userDetails.profileURL || 'https://via.placeholder.com/100',
            });

            // Set logged in state to true to trigger redirect
            setIsLoggedIn(true);
          } else {
            Alert.alert('Error', 'Failed to fetch user details.');
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } else {
        Alert.alert('Login failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login error', 'An error occurred during login. Please try again.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Use router.push for programmatic navigation
      router.replace('../(tabs)/home');
    }
  }, [isLoggedIn]); // Effect runs when isLoggedIn changes

  return (
    <View className='flex-1 bg-white'>
      <Image
        className='self-center mt-16'
        source={require('../../assets/png/logo.png')}
        resizeMode="contain"
      />

      <View className='items-center px-8 pt-24'>
        <Text className='text-xl font-bold'>
          Enter your email address
        </Text>

        <TextInput
          className='w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-5 py-1.5 mt-6 text-base'
          value={email}
          onChangeText={onChangeEmail}
          placeholder={'sample@domain.com'}
          keyboardType={'email-address'}
          autoCapitalize="none"
        />

        <Text className='text-xl font-bold mt-4'>
          Enter your password
        </Text>

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
            <MaterialCommunityIcons
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>

        <Pressable className='self-start mt-1'>
          <Text className='text-sm text-black font-medium ml-2'>Forgot Password?</Text>
        </Pressable>

        <Pressable onPress={handleLogin} className='w-full h-11 justify-center bg-green-500 rounded-lg py-2.5 mt-5'>
          <Text className='text-white text-base text-center font-semibold'>Continue</Text>
        </Pressable>

        <View className='flex-row items-center mt-8'>
          <View className='flex-1 h-0.5 bg-gray-200' />
          <Text className='text-sm text-gray-500 mx-4'>or continue with</Text>
          <View className='flex-1 h-0.5 bg-gray-200' />
        </View>

        <Pressable onPress={() => router.push('/SignUpEmail')} className='w-full h-11 justify-center bg-gray-200 rounded-lg py-2.5 mt-8'>
          <View className='flex-row items-center justify-center space-x-2'>
            <Image source={require('../../assets/png/googleIcon.png')} resizeMode="contain" />
            <Text className='inline text-base text-gray-500 font-semibold'>Google</Text>
          </View>
        </Pressable>

        <Text className='text-sm text-gray-500 text-center leading-5 mt-10'>
          By clicking continue, you agree to our <Text className='font-bold text-black'>Terms of Service and Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUpEmail;
