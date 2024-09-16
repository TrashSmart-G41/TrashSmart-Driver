import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ConfirmPhone from '../../components/AuthStack/ConfirmPhone'
export default function ConfirmPhoneScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <ConfirmPhone />
    </SafeAreaView>
  )
}