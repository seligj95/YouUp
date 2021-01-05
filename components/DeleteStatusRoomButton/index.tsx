import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import style from './style';
import { useNavigation } from '@react-navigation/native';

const DeleteStatusRoomButton = () => {

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('StatusesScreen');
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPress}>
          <FontAwesome5 name="users" size={28} color="white" />
      </TouchableOpacity>
    </View>

  )
};

export default DeleteStatusRoomButton;