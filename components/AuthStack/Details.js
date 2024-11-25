import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import GoBack from '../../components/GoBack';
import { useRouter } from 'expo-router';  // Import useRouter

const Details = () => {
    const [firstName, onChangeFirstName] = useState('');
    const [lastName, onChangeLastName] = useState('');
    const [birthday, onChangeBirthday] = useState('');

    const [focusedInput, setFocusedInput] = useState(null);

    const router = useRouter();  // Initialize useRouter

    return (
        <View className='flex-1 bg-white'>
            <GoBack />

            <View className='flex-1 px-8 mt-24'>
                <FontAwesome6 name="contact-card" size={36} color="lightgray" />
                
                <Text className='text-black text-2xl font-bold mt-5'>
                    Your details
                </Text>
                <Text className='text-gray-500 text-base leading-5 mt-3'>
                    Please provide your personal details to continue. This information will help us to create your account and personalize your experience.
                </Text>

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-5 text-base font-light ${focusedInput === 'firstName' ? 'border-2 border-green-400' : ''}`}
                    value={firstName}
                    onChangeText={onChangeFirstName}
                    placeholder={'First name'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('firstName')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-4 text-base font-light ${focusedInput === 'lastName' ? 'border-2 border-green-400' : ''}`}
                    value={lastName}
                    onChangeText={onChangeLastName}
                    placeholder={'Last name'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('lastName')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-4 text-base font-light  ${focusedInput === 'birthday' ? 'border-2 border-green-400' : ''}`}
                    value={birthday}
                    onChangeText={onChangeBirthday}
                    placeholder={'Birthday (mm/dd/yyyy)'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('birthday')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <View className='flex-1 justify-end mb-16'>
                    <Pressable 
                        className='w-full bg-green-500 rounded-xl py-3.5'
                        onPress={() => router.push('/Address')}  // Use router.push to navigate
                    >
                        <Text className='text-white text-lg text-center font-semibold'>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Details;
