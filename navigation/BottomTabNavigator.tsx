import { Ionicons, Zocial } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import StatusesScreen from '../screens/StatusesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { BottomTabParamList, StatusesParamList, SettingsParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Statuses"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].background,
        style: {
          backgroundColor: Colors[colorScheme].tint,
        },
        activeBackgroundColor: '#E9765B',
        labelStyle: {
          fontWeight: 'bold'
        } 
      }}>
      <BottomTab.Screen
        name="Statuses"
        component={StatusesTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <Zocial name="statusnet" size={28} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="settings-sharp" size={28} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function tabBarIcon(props: { name: string; color: string }) {
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const StatusesTabStack = createStackNavigator<StatusesParamList>();

function StatusesTabNavigator() {
  return (
    <StatusesTabStack.Navigator>
      <StatusesTabStack.Screen
        name="StatusesScreen"
        component={StatusesScreen}
        options={{ headerTitle: 'Statuses' }}
      />
    </StatusesTabStack.Navigator>
  );
}

const SettingsTabStack = createStackNavigator<SettingsParamList>();

function SettingsTabNavigator() {
  return (
    <SettingsTabStack.Navigator>
      <SettingsTabStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </SettingsTabStack.Navigator>
  );
}
