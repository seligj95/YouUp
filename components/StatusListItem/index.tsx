import moment from 'moment';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { StatusItem } from '../../types';
import style from './style';

export type StatusListItemProps = {
  statusItem: StatusItem;
}

const StatusListItem = (props: StatusListItemProps) => {
  const { statusItem } = props;

  const contact = statusItem.users[1];

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
            {moment(statusItem.contactStatus.createdAt).format('MM/DD/YYYY, h:mm a')}
          </Text>
        </View>
      </View>
      <View style={style.userStatusContainer}>
        <Text style={style.userStatus}>Set Status: {statusItem.userStatus.content}</Text>
      </View>
    </View>
  );
};

export default StatusListItem;