import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Notifications from '../../components/AuthStack/Notifications'
export default function NotificationsScreen() {
  return (
    <SafeAreaView style={{ flex:1}}>
      <Notifications />
    </SafeAreaView>
  )
}