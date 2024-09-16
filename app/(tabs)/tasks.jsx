import { View, Text, SafeAreaView } from 'react-native';
import React, { useContext} from 'react';
import Header from '../../components/Header';
// import InHand from '../../components/Tasks/InHand';
// import CollectionMap from '../../components/Tasks/CollectionMap';
import TopBar from '../../components/Tasks/(tabs)/TopBar';
import { ThemeContext } from '../../context/ThemeContext';


export default function Tasks() {
  const { theme } = useContext(ThemeContext);
  return (
   
      <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff' }}>
        <Header />
        <TopBar />
      </SafeAreaView>
   
  );
}
