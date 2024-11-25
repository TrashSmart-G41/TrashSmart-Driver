import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Details from '../../components/AuthStack/Details'
export default function DetailsScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <Details />
    </SafeAreaView>
  )
}