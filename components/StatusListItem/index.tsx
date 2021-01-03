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
  //determine who is the user and who is the contact, and associate statuses
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
    // console.log(statusRoom.statusRoomUsers.items[0].user.statusRoomUser.items[0].statusRoom.statuses.items[0].content);
  }, [])
  
  const onClick = () => {
    navigation.navigate('StatusUpdate', { 
      id: statusRoom.id, 
      name: otherUser.name,
    })
  };

  if (!otherUser) {
    return null;
  }
  const otherUserStatusCheck = otherUser.statusRoomUser.items[0].statusRoom.statuses.items;
  const otherUserUpdatedAt = moment(otherUser.statusRoomUser.items[0].statusRoom.statuses.items[1].updatedAt).format('MM/DD/YY, h:mm a');
  const otherUserStatus = otherUser.statusRoomUser.items[0].statusRoom.statuses.items[1].content;
  const userStatus = statusRoom.statusRoomUsers.items[0].user.statusRoomUser.items[0].statusRoom.statuses.items[0].content;
  const userStatusCheck = statusRoom.statusRoomUsers.items[0].user.statusRoomUser.items[0].statusRoom.statuses.items;

  return (
    <View style={style.container}>
      <View style={style.leftContainer}>
        <Image source={{ uri: otherUser.imageUri }} style={style.avatar} />
        <View style={style.contactNameContainer}>
          <Text style={style.contactName}>{otherUser.name}</Text>
        </View>
        <View style={style.contactStatusContainer}>
          <Text style={style.contactStatus}>
              {otherUserStatusCheck ? 
              otherUserStatus : 
              ""}
          </Text>
          <Text style={style.lastUpdate}>
            {'Last Updated:\n'}
            {otherUserStatusCheck
            && 
            otherUserUpdatedAt}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={style.userStatusContainer}>
          <Text style={style.userStatus}>
            Set Status: 
            {userStatusCheck ? 
            userStatus : 
            ""}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StatusListItem;