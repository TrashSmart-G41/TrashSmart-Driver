import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InHand from '../InHand';
import Rejected from '../Rejected';
import Cancelled from '../Cancelled';
import { ThemeContext } from '../../../context/ThemeContext'; // Import ThemeContext
console.log('TopBar.jsx');
const { width } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();



export default function TopBar() {
  const { theme } = useContext(ThemeContext); // Access the current theme from ThemeContext

  return (
    // Apply the dark mode background to the entire container, not just the Tab.Navigator
   
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused }) => {
            let title;
            let count = 0;

            switch (route.name) {
              case 'In Hand':
                title = 'In Hand';
                count = 2;  // Example count
                break;
              case 'Rejected':
                title = 'Rejected';
                count = 3;  // Example count
                break;
              case 'Cancelled':
                title = 'Cancelled';
                count = 1;  // Example count
                break;
              default:
                title = 'Tab';
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
        <Tab.Screen name="In Hand" component={InHand} />
        <Tab.Screen name="Rejected" component={Rejected} />
        <Tab.Screen name="Cancelled" component={Cancelled} />
      </Tab.Navigator>
    
  );
}
