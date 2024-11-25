import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Address from '../../components/AuthStack/Address'
export default function AddressScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <Address />
    </SafeAreaView>
  )
}