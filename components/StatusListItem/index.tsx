import moment from 'moment';
import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { StatusItem } from '../../types';
import style from './style';
import { useNavigation } from '@react-navigation/native';

export type StatusListItemProps = {
  statusItem: StatusItem;
};

const StatusListItem = (props: StatusListItemProps) => {
  const { statusItem } = props;

  const navigation = useNavigation();
  
  const contact = statusItem.users[1];

  const onClick = () => {
    navigation.navigate('StatusUpdate', { 
      id: statusItem.id, 
      name: contact.name,
    })
  };

  return (
    <View style={style.container}>
      <View style={style.leftContainer}>
        <Image source={{ uri: contact.imageUri }} style={style.avatar} />
        <View style={style.contactNameContainer}>
          <Text style={style.contactName}>{contact.name}</Text>
        </View>
        <View style={style.contactStatusContainer}>
          <Text style={style.contactStatus}>{statusItem.contactStatus.content}</Text>
          <Text style={style.lastUpdate}>
            {'Last Updated:\n'}
            {moment(statusItem.contactStatus.createdAt).format('MM/DD/YY, h:mm a')}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={style.userStatusContainer}>
          <Text style={style.userStatus}>Set Status: {statusItem.userStatus.content}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StatusListItem;