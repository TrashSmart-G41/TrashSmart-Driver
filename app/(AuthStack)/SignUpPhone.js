import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SignUpPhone from '../../components/AuthStack/SignUpPhone'
export default function SignUpPhoneScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <SignUpPhone />
    </SafeAreaView>
  )
}