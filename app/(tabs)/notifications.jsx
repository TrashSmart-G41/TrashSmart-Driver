import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../components/Header'
import Notifications from '../../components/Notifications/Notifications'
import { ThemeContext } from '../../context/ThemeContext';
export default function notifications() {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff' }}>
       <Header></Header>
        <Notifications></Notifications>
    </SafeAreaView>
  )
}