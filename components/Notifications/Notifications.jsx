import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext
import Unread from './Unread';
import All from './All';
import Last_07_Days from './Last 07 Days';

const { width } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();


export default function Notifications() {
  const { theme } = useContext(ThemeContext); // Access current theme

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let title;
          let count = 0;

          switch (route.name) {
            case 'Unread':
              title = 'Unread';
              count = 2;
              break;
            case 'Last 07 days':
              title = 'Last 07 days';
              count = 0; // Example count
              break;
            case 'All':
              title = 'All';
              count = 102;
              break;
          }

          return (
            <Text
              className={`text-sm ${focused ? 'font-bold' : 'font-normal'} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              style={{ fontSize: width * 0.035 }}
            >
              {`${title} (${count})`}
            </Text>
          );
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme === 'dark' ? 'white' : 'black',
        },
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? 'black' : 'white',
        },
      })}
    >
      <Tab.Screen name="Unread" component={Unread} />
      <Tab.Screen name="Last 07 days" component={Last_07_Days} />
      <Tab.Screen name="All" component={All} />
    </Tab.Navigator>
  );
}
