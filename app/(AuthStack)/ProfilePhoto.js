import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ProfilePhoto from '../../components/AuthStack/ProfilePhoto'
export default function ProfilePhotoScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <ProfilePhoto />
    </SafeAreaView>
  )
}