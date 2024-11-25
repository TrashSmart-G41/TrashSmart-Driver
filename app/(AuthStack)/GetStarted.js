import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import GetStarted from '../../components/AuthStack/GetStarted'
export default function GetStartedScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <GetStarted />
    </SafeAreaView>
  )
}