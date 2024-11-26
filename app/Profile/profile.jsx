import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [dob, setDob] = useState('');

  const { setUser } = useContext(UserContext);  // Access setUser from UserContext
  const { theme } = useContext(ThemeContext);  // Access theme from ThemeContext
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const userId = await AsyncStorage.getItem('userId');

        if (token && userId) {
          const response = await fetch(`http://10.0.2.2:8081/api/v1/driver/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setPhone(data.contactNo);
            setAddress(data.address);
            setRole(data.role);
            setDob(data.dob);
            setProfileImage(data.profileURL || 'https://via.placeholder.com/100');
          } else {
            Alert.alert('Error', 'Failed to load profile data');
          }
        } else {
          Alert.alert('Error', 'User not logged in');
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        Alert.alert('Error', 'An error occurred while fetching profile data');
      }
    };

    fetchProfile();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSaveChanges = async () => {
    if (!firstName || !lastName || !email || !phone || !address || !dob) {
      Alert.alert('Error', 'All fields must be filled in');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      if (token && userId) {
        const response = await fetch(`http://10.0.2.2:8081/api/v1/driver/update/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            contactNo: phone,
            address,
            dob,
          }),
        });

        if (response.ok) {
          // Update the user context with the new data
          setUser({
            token,
            userRole: role,
            userEmail: email,
            userId,
            firstName,
            lastName,
            phone,
            address,
            dob,
            profileImage,
          });

          Alert.alert('Success', 'Profile updated successfully');
          router.push('/(tabs)/home');
        } else {
          Alert.alert('Error', 'Failed to update profile');
        }
      } else {
        Alert.alert('Error', 'User not logged in');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'An error occurred while updating profile');
    }
  };

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      <TouchableOpacity className="absolute top-24 left-4 z-10" onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? 'white' : 'black'} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 px-5">
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImage }} className="w-24 h-24 rounded-full mt-5 mb-5 self-center" />
        </TouchableOpacity>
        <Text className={`text-lg mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>First Name</Text>
        <TextInput
          className={`w-full h-12 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg px-3 mb-4`}
          placeholder="First Name"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#333'}
          value={firstName}
          onChangeText={setFirstName}
        />
        
        <Text className={`text-lg mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Last Name</Text>
        <TextInput
          className={`w-full h-12 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg px-3 mb-4`}
          placeholder="Last Name"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#333'}
          value={lastName}
          onChangeText={setLastName}
        />
        
        <Text className={`text-lg mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Email</Text>
        <TextInput
          className={`w-full h-12 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg px-3 mb-4`}
          placeholder="samankumara@gmail.com"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#333'}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        
        <Text className={`text-lg mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Phone</Text>
        <TextInput
          className={`w-full h-12 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg px-3 mb-4`}
          placeholder="077-4936420"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#333'}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text className={`text-lg mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Address</Text>
        <TextInput
          className={`w-full h-12 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg px-3 mb-4`}
          placeholder="Kurunegala"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#333'}
          value={address}
          onChangeText={setAddress}
        />

        <Text className={`text-lg mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Role</Text>
        <TextInput
          className={`w-full h-12 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg px-3 mb-4`}
          placeholder="Driver"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#333'}
          value={role}
          editable={false}
        />

        <Text className={`text-lg mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Date of Birth</Text>
        <TextInput
          className={`w-full h-12 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg px-3 mb-4`}
          placeholder="2001-04-09"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#333'}
          value={dob}
          onChangeText={setDob}
        />
        
        <TouchableOpacity className="w-full h-14 bg-green-500 rounded-lg justify-center items-center mt-4" onPress={handleSaveChanges}>
          <Text className="text-white text-lg font-bold">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
