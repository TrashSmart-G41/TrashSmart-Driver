import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useState } from 'react';
import PagerView from 'react-native-pager-view';
import Dots from 'react-native-dots-pagination';
import { useRouter } from 'expo-router';  // Import useRouter

const GetStarted = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const router = useRouter();  // Initialize useRouter

  return (
    <View className='flex-1 bg-white'>
      <PagerView
        className='flex-1'
        initialPage={0}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}>
        <View className='flex-1 justify-end bg-white'>
          <ImageBackground
            source={require('../../assets/png/getStartedBackground.png')}
            className='flex-1 justify-end'
            resizeMode='cover'>
            <View className='flex items-center bg-white'>
              <Text className='text-black text-2xl font-bold mt-12'>
                Welcome to TrashSmart
              </Text>
              <Text className='text-base text-gray-500 text-center leading-5 px-4 mt-2'>
                Efficiently manage and schedule your waste{'\n'}collection, featuring real-time notifications,{'\n'}customizable pickup reminders, and easy{'\n'}reporting of missed collections.
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View className='flex-1 justify-end bg-white'>
          <ImageBackground
            source={require('../../assets/png/getStartedBackground.png')}
            className='flex-1 justify-end'
            resizeMode='cover'>
            <View className='flex items-center bg-white'>
              <Text className='text-black text-2xl font-bold mt-14'>
                Bye from TrashSmart
              </Text>
              <Text className='text-base text-gray-500 text-center leading-5 px-4 mt-2'>
                Efficiently manage and schedule your waste{'\n'}collection, featuring real-time notifications,{'\n'}customizable pickup reminders, and easy{'\n'}reporting of missed collections.
              </Text>
            </View>
          </ImageBackground>
        </View>
      </PagerView>

      <View className='mt-2'>
        <Dots
          length={2}
          active={pageIndex}
          activeDotWidth={8.5}
          activeDotHeight={8.5}
          activeDotColor="#7ED957"
          passiveDotColor="#ccc"
          passiveDotWidth={7}
          passiveDotHeight={7}
        />
      </View>

      <Pressable
        onPress={() => router.push('/LoginOrSignup')}  // Use router.push for navigation
        className='w-80 bg-green-500 rounded-xl py-3.5 mt-10 self-center mb-20'>
        <Text className='text-white text-lg text-center font-semibold'>Get Started</Text>
      </Pressable>
    </View>
  );
};

export default GetStarted;
