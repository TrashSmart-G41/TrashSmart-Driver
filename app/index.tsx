import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from "jwt-decode";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext); // Access setUser from UserContext

  // useEffect(() => {
  //   const clearStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('AsyncStorage has been cleared!');
  //     } catch (error) {
  //       console.error('Failed to clear AsyncStorage:', error);
  //     }
  //   };

  //   clearStorage(); // Clear storage on app start
  // }, []);

  useEffect(() => {
    

    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
          const decodedToken = jwtDecode(token);

          if (decodedToken && decodedToken.exp) {
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp > currentTime) {
              // Set user data in context
              setUser({
                token,
                userRole: await AsyncStorage.getItem('userRole'),
                userEmail: await AsyncStorage.getItem('userEmail'),
                userId: await AsyncStorage.getItem('userId'),
              });
              setIsLoggedIn(true);
            } else {
              // Token is expired, remove it from AsyncStorage
              await AsyncStorage.removeItem('jwtToken');
              await AsyncStorage.removeItem('userRole');
              await AsyncStorage.removeItem('userEmail');
              await AsyncStorage.removeItem('tokenExpiry');
              await AsyncStorage.removeItem('userId');
            }
          }
        }
      } catch (error) {
        console.error('Failed to load token', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/(AuthStack)/GetStarted" />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
