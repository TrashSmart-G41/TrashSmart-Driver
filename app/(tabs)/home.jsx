import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import Greetings from '../../components/Home/Greetings';
import Insights from '../../components/Home/Insights';
import Header from '../../components/Header';
import Schedule from '../../components/Home/Schedule';
import { ThemeContext } from '../../context/ThemeContext';

export default function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff' }}>
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Greetings />
        <Insights />
        <Schedule />
      </ScrollView>
    </SafeAreaView>
  );
}
