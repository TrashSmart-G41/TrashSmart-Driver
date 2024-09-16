import { View, Text, Image, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';  // Import useRouter

const SignUpPhone = () => {
  const [phoneNumber, OnChangePhoneNumber] = useState('');
  const router = useRouter();  // Initialize useRouter

  return (
    <View className='flex-1 bg-white'>
      <Image
        className='self-center mt-16'
        source={require('../../assets/png/logo.png')}
        resizeMode="contain"
      />

      <View className='items-center px-8 pt-24'>
        <Text className='text-xl font-bold'>
          Enter your phone number
        </Text>

        <TextInput
          className='w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-5 py-1.5 mt-6 text-base'
          value={phoneNumber}
          onChangeText={OnChangePhoneNumber}
          placeholder={'+94-7xx-xxx-xxx'}
          keyboardType={'phone-pad'}
        />

        <Pressable
          onPress={() => router.push('/ConfirmPhone')}  // Use router.push to navigate
          className='w-full h-11 justify-center bg-green-500 rounded-lg py-2.5 mt-5'>
          <Text className='text-white text-base text-center font-semibold'>Continue</Text>
        </Pressable>

        <Text className='text-sm text-gray-500 mt-8'>
          or continue with
        </Text>

        <Pressable
          onPress={() => router.push('/SignUpEmail')}  // Use router.push to navigate
          className='w-full h-11 justify-center bg-gray-200 rounded-lg py-2.5 mt-8'>
          <View className='flex-row items-center justify-center space-x-1'>
            <MaterialCommunityIcons name="email-outline" size={26} color="gray" />
            <Text className='inline text-base text-gray-500 font-semibold'>Email</Text>
          </View>
        </Pressable>

        <Text className='text-sm text-gray-500 text-center leading-5 mt-10'>
          By clicking continue, you agree to our <Text className='font-bold text-black'>Terms of Service and Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

export default SignUpPhone;
