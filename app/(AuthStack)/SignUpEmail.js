import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SignUpEmail from '../../components/AuthStack/SignUpEmail'
export default function SignUpEmailScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <SignUpEmail />
    </SafeAreaView>
  )
}