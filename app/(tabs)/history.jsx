import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext} from 'react'
import Header from '../../components/Header'
import Stats from '../../components/History/Stats'
import { ThemeContext } from '../../context/ThemeContext';
export default function history() {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff' }}>
      <Header />
      <Stats />
    </SafeAreaView>
  )
}