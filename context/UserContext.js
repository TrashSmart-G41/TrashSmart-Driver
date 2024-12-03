// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userDetails');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('Restored User:', parsedUser); // Debug log
          setUser(parsedUser);
          console.log('User context updated with:', parsedUser);
        }
      } catch (error) {
        console.error('Error restoring user:', error);
      }
    };
    restoreUser();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
