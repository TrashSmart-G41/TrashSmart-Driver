import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Success from '../../components/AuthStack/Success'
export default function SuccessScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <Success />
    </SafeAreaView>
  )
}