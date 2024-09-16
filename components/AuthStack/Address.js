import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import GoBack from '../../components/GoBack';
import { useRouter } from 'expo-router';  // Import useRouter
import { Ionicons } from '@expo/vector-icons';

const Address = () => {
    const [address, onChangeAddress] = useState('');
    const [addressLine2, onChangeAddressLine2] = useState('');
    const [city, onChangeCity] = useState('');
    const [postalCode, onChangePostalCode] = useState('');
    const [country, onChangeCountry] = useState('');

    const [focusedInput, setFocusedInput] = useState(null);

    const router = useRouter();  // Initialize useRouter

    return (
        <View className='flex-1 bg-white'>
            <GoBack /> {/* GoBack component now uses router, so no need to pass navigation */}

            <View className='flex-1 px-8 mt-8'>
                <Ionicons name="location-outline" size={42} color="lightgray" />

                <Text className='text-black text-2xl font-bold mt-5'>
                    Your address
                </Text>
                <Text className='text-gray-500 text-base leading-5 mt-3'>
                    Your address is required to ensure accurate and timely waste collection services tailored to your location.
                </Text>

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-5 text-base font-light ${focusedInput === 'address' ? 'border-2 border-green-400' : ''}`}
                    value={address}
                    onChangeText={onChangeAddress}
                    placeholder={'Address'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('address')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-3 text-base font-light ${focusedInput === 'addressLine2' ? 'border-2 border-green-400' : ''}`}
                    value={addressLine2}
                    onChangeText={onChangeAddressLine2}
                    placeholder={'Address line 2'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('addressLine2')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-3 text-base font-light ${focusedInput === 'city' ? 'border-2 border-green-400' : ''}`}
                    value={city}
                    onChangeText={onChangeCity}
                    placeholder={'City'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('city')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-3 text-base font-light ${focusedInput === 'postalCode' ? 'border-2 border-green-400' : ''}`}
                    value={postalCode}
                    onChangeText={onChangePostalCode}
                    placeholder={'Postal code'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('postalCode')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-3 text-base font-light ${focusedInput === 'country' ? 'border-2 border-green-400' : ''}`}
                    value={country}
                    onChangeText={onChangeCountry}
                    placeholder={'Country'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('country')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <View className='flex-1 justify-end mb-16'>
                    <Pressable 
                        className='w-full bg-green-500 rounded-xl py-3'
                        onPress={() => router.push('/ProfilePhoto')}  // Use router.push to navigate
                    >
                        <Text className='text-white text-lg text-center font-semibold'>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Address;
