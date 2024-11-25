import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Details');
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [router]);

  return (
    <View className='flex-1 bg-white items-center justify-center mt-[-36]'>
      <Ionicons name="checkmark-circle" size={72} color="#22C55E" />
      <Text className='text-base'>Done</Text>
    </View>
  );
}

export default Success;
