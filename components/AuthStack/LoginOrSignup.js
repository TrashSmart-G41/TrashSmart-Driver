import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const LoginOrSignup = () => {
  const router = useRouter(); // Initialize useRouter

  return (
    <View className='flex-1 bg-white'>
      <Image className='w-80 self-center mt-28'
        source={require('../../assets/png/LoginOrSignupImage.png')}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />

      <View className='flex-1 relative items-center mt-28 px-10'>

        <Pressable onPress={() => router.back()} className='absolute right-10 top-[-42]'>
          <Ionicons name="close-circle" size={30} color="lightgray" />
        </Pressable>

        <Text className='text-2xl font-bold'>
          Login or sign up
        </Text>
        <Text className='text-base text-gray-500 text-center leading-5 px-4 mt-2'>
          Please select your preferred method{'\n'}to continue
        </Text>

        <Pressable onPress={() => router.push('/SignUpPhone')} className='w-full bg-green-500 rounded-xl py-3.5 mt-8'>
          <Text className='text-white text-lg text-center font-semibold'>Continue with Phone</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/SignUpEmail')} className='w-full rounded-xl border-2 border-green-500 py-3 mt-3'>
          <Text className='text-black text-lg text-center font-semibold'>Continue with Email</Text>
        </Pressable>

        <View className='flex-row mt-3 space-x-2'>
          <Pressable onPress={() => {}} className='basis-1/2 rounded-xl border-2 border-green-500 py-3 items-center'>
            <Image source={require('../../assets/png/googleIcon.png')} resizeMode="contain" />
          </Pressable>
          <Pressable onPress={() => {}} className='basis-1/2 rounded-xl border-2 border-green-500 py-3 items-center'>
            <Ionicons name="logo-apple" size={30} color="gray" className='self-center' />
          </Pressable>
        </View>

        <Text className='text-sm text-gray-500 text-center leading-5 mt-14'>
          If you are creating a new account,{'\n'}
          <Text className='underline'>Terms & Conditions</Text> and <Text className='underline'>Privacy Policy</Text> will apply.
        </Text>

      </View>
    </View>
  );
};

export default LoginOrSignup;
