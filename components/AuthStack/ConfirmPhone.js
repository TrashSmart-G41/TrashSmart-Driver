import { View, Text, TextInput, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import GoBack from '../../components/GoBack';
import { useRouter } from 'expo-router';  // Import useRouter

const ConfirmPhone = () => {
    const [input1, onChangeInput1] = useState('');
    const [input2, onChangeInput2] = useState('');
    const [input3, onChangeInput3] = useState('');
    const [input4, onChangeInput4] = useState('');
    const [input5, onChangeInput5] = useState('');

    const [focusedInput, setFocusedInput] = useState(null);

    const router = useRouter();  // Initialize useRouter

    return (
        <View className='flex-1 bg-white'>
            <GoBack /> {/* No need to pass navigation since GoBack uses router */}

            <View className='flex items-center'>
                <Image 
                    className='self-center mt-20'
                    source={require('../../assets/png/securityIcon.png')}
                    resizeMode="contain"
                />

                <Text className='text-xl font-bold mt-8'>
                    Enter Code
                </Text>

                <Text className='text-base text-center leading-5 text-gray-500 mt-4'>
                    Your verification code was sent to{'\n'}
                    <Text className='font-bold text-black'>(555) 867-5309</Text>
                </Text>

                <View className='flex-row space-x-4 mt-4'>
                    <TextInput
                        className={`h-14 w-14 bg-gray-200 rounded-lg mt-7 text-lg text-center ${focusedInput === 'input1' ? 'border-2 border-green-400' : ''}`}
                        value={input1}
                        onChangeText={onChangeInput1}
                        placeholder={'-'}
                        maxLength={1}
                        keyboardType={'number-pad'}
                        onFocus={() => setFocusedInput('input1')}
                        onBlur={() => setFocusedInput(null)}
                    />

                    <TextInput
                        className={`h-14 w-14 bg-gray-200 rounded-lg mt-7 text-lg text-center ${focusedInput === 'input2' ? 'border-2 border-green-400' : ''}`}
                        value={input2}
                        onChangeText={onChangeInput2}
                        placeholder={'-'}
                        maxLength={1}
                        keyboardType={'number-pad'}
                        onFocus={() => setFocusedInput('input2')}
                        onBlur={() => setFocusedInput(null)}
                    />

                    <TextInput
                        className={`h-14 w-14 bg-gray-200 rounded-lg mt-7 text-lg text-center ${focusedInput === 'input3' ? 'border-2 border-green-400' : ''}`}
                        value={input3}
                        onChangeText={onChangeInput3}
                        placeholder={'-'}
                        maxLength={1}
                        keyboardType={'number-pad'}
                        onFocus={() => setFocusedInput('input3')}
                        onBlur={() => setFocusedInput(null)}
                    />

                    <TextInput
                        className={`h-14 w-14 bg-gray-200 rounded-lg mt-7 text-lg text-center ${focusedInput === 'input4' ? 'border-2 border-green-400' : ''}`}
                        value={input4}
                        onChangeText={onChangeInput4}
                        placeholder={'-'}
                        maxLength={1}
                        keyboardType={'number-pad'}
                        onFocus={() => setFocusedInput('input4')}
                        onBlur={() => setFocusedInput(null)}
                    />

                    <TextInput
                        className={`h-14 w-14 bg-gray-200 rounded-lg mt-7 text-lg text-center ${focusedInput === 'input5' ? 'border-2 border-green-400' : ''}`}
                        value={input5}
                        onChangeText={onChangeInput5}
                        placeholder={'-'}
                        maxLength={1}
                        keyboardType={'number-pad'}
                        onFocus={() => setFocusedInput('input5')}
                        onBlur={() => setFocusedInput(null)}
                    />
                </View>

                <Pressable onPress={() => router.push('/Success')}>
                    <Text className='text-xl font-bold mt-8'>
                        Verify
                    </Text>
                </Pressable>

                <Text className='text-base text-center text-gray-500 mt-12'>
                    Didn’t receive a code?
                    <Text className='text-green-500 font-bold'> Send again</Text>
                </Text>
            </View>
        </View>
    );
}

export default ConfirmPhone;
