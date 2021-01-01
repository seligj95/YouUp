import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import UserStatusUpdateScreen from '../screens/UserStatusUpdateScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ContactsScreen from '../screens/ContactsScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <Stack.Screen 
        name="Root" 
        component={BottomTabNavigator} 
        options={{
          title: "YouUp?",
          headerRight: () => (
            // make this a modal for filtering the statuses, only show on status screen
            <TouchableOpacity>
              <View style={{marginRight: 20}}>
                <Ionicons name="ios-filter" size={30} color={Colors.light.background} />
              </View>
            </TouchableOpacity>
          )
        }}
      />
      {/* make into a modal??? */}
      <Stack.Screen 
        name="StatusUpdate" 
        component={UserStatusUpdateScreen} 
        options={({ route }) => ({ 
          title: route.params.name,
          headerRight: () => (
            // make this a button that clears tags and resets status?
            <TouchableOpacity>
              <View style={{marginRight: 20}}>
                <MaterialCommunityIcons name="restart" size={30} color={Colors.light.background} />
              </View>
            </TouchableOpacity>
          ) 
        })} 
      />
      <Stack.Screen 
        name="Contacts"
        component={ContactsScreen}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
