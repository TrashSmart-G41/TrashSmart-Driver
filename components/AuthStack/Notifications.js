import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';  // Import useRouter

const Notifications = () => {
  const router = useRouter();  // Initialize useRouter

  return (
    <View className='flex-1 bg-white items-center'>
      <Image 
        className='w-80 self-center mt-36'
        source={require('../../assets/png/notifications_img.png')}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel={'Notifications Image'}
      />

      <Text className='text-xl text-black font-bold mt-16'>
        Turn on notifications?
      </Text>

      <Text className='text-gray-500 text-base text-center leading-5 mt-3'>
        Don't miss important messages like{'\n'}collection dispatches and account activity 
      </Text>

      <View className='flex-1 justify-end px-8 w-full mb-20'>
        <Pressable onPress={() => {}} className='w-full bg-green-500 rounded-xl py-3.5 mt-3'>
          <Text className='text-white text-base text-center font-semibold'>Enable Notifications</Text>
        </Pressable>

        <Pressable 
          onPress={() => router.push('../(tabs)/home')}  // Use router.push to navigate
          className='w-full py-3.5 mt-2'>
          <Text className='text-green-500 text-base text-center font-semibold'>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Notifications;
