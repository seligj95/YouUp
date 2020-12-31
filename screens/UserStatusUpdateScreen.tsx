import React from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const UserStatusUpdateScreen = () => {
  const route = useRoute();
  // console.log(route.params)

  return (
    <Text>Status Update Screen</Text>
  );
}

export default UserStatusUpdateScreen;
