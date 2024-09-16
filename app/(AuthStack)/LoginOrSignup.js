import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LoginOrSignup from '../../components/AuthStack/LoginOrSignup'
export default function LoginOrSignupScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <LoginOrSignup />
    </SafeAreaView>
  )
}