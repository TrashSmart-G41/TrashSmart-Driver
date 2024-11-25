import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import GoBack from '../../components/GoBack';
import { useRouter } from 'expo-router';  // Import useRouter
import { FontAwesome6 } from '@expo/vector-icons';

const ProfilePhoto = () => {
  const [photo, setPhoto] = useState(null);
  const router = useRouter();  // Initialize useRouter

  const takePhoto = () => {
    // Implement take photo functionality
  };

  const addFromLibrary = () => {
    // Implement add from library functionality
  };

  return (
    <View className='flex-1 bg-white'>
      <View className='flex-row justify-between items-center'>
        <GoBack />
        <Pressable 
          onPress={() => router.push('/Notifications')}  // Use router.push to navigate
          className='flex-row items-center justify-start mr-8 mt-8'>
          <Text className='text-lg text-green-500 font-semibold'>Skip</Text>
        </Pressable>
      </View>

      <View className='flex items-center'>
        <Text className='text-black text-2xl font-bold mt-10'>Upload Profile Photo</Text>
        <Text className='text-gray-500 text-base text-center leading-5 mt-3'>
          Take a new photo or upload from your library to{'\n'}set your profile photo.
        </Text>
      </View>

      <View className='self-center justify-self-center mt-36'>
        {photo ? (
          <Image source={{ uri: photo }} resizeMode="contain" />
        ) : (
          <FontAwesome6 name="user-circle" size={140} color="lightgray" />
        )}
      </View>

      <View className='flex-1 justify-end px-8 mb-10'>
        <Pressable onPress={takePhoto} className='w-full rounded-xl border-2 border-green-500 py-3 mt-8'>
          <Text className='text-black text-base text-center font-semibold'>Take photo</Text>
        </Pressable>
        <Pressable onPress={addFromLibrary} className='w-full bg-green-500 rounded-xl py-3.5 mt-3'>
          <Text className='text-white text-base text-center font-semibold'>Add from library</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfilePhoto;
