import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { StatusItem } from '../../types';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

export type StatusListItemProps = {
  statusRoom: StatusItem;
};

const StatusListItem = (props: StatusListItemProps) => {
  const { statusRoom } = props;
  const [otherUser, setOtherUser] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (statusRoom.statusRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(statusRoom.statusRoomUsers.items[1].user);
      } else {
        setOtherUser(statusRoom.statusRoomUsers.items[0].user);
      }
    }
    getOtherUser();
  }, [])

  if (!otherUser) {
    return null;
  }
  
  const onClick = () => {
    navigation.navigate('StatusUpdate', { 
      id: statusRoom.id, 
      name: otherUser.name,
    })
  };

  return (
    <View style={style.container}>
      <View style={style.leftContainer}>
        <Image source={{ uri: otherUser.imageUri }} style={style.avatar} />
        <View style={style.contactNameContainer}>
          <Text style={style.contactName}>{otherUser.name}</Text>
        </View>
        <View style={style.contactStatusContainer}>
          <Text style={style.contactStatus}>
            {statusRoom.lastContactStatus
              ? `${statusRoom.lastContactStatus.content}`
              : ""}
          </Text>
          <Text style={style.lastUpdate}>
            {'Last Updated:\n'}
            {statusRoom.lastContactStatus && moment(statusRoom.lastContactStatus.updatedAt).format('MM/DD/YY, h:mm a')}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={style.userStatusContainer}>
          <Text style={style.userStatus}>
            {'Status: '}
            {statusRoom.lastUserStatus
              ? `${statusRoom.lastUserStatus.content}`
              : ""}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StatusListItem;