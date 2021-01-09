import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { StatusItem, User } from '../../types';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getStatusRoomData } from '../../screens/queries';
import { getStatusRoomUser } from '../../graphql/queries';

export type StatusListItemProps = {
  statusRoom: StatusItem;
};

const StatusListItem = (props: StatusListItemProps) => {
  // setting const
  const { statusRoom } = props;
  console.log(statusRoom)
  const [otherUser, setOtherUser] = useState(null);
  const [myStatusRoomUserId, setMyStatusRoomUserId] = useState('');
  const [contactStatusRoomUserId, setContactStatusRoomUserId] = useState('');
  const [myLastStatus, setMyLastStatus] = useState('');
  const [myLastStatusTime, setMyLastStatusTime] = useState('');
  const [contactLastStatus, setContactLastStatus] = useState('');
  const [contactLastStatusTime, setContactLastStatusTime] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    // query to get authenicated user's status room user ID
    const getLastStatuses = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userId = userInfo.attributes.sub;

      const statusRoomData = await API.graphql(
        graphqlOperation(
          getStatusRoomData, {
            id: statusRoom.id
          }
        )
      )
      // get authenticated user's status room user id
      const statusRoomUserIds = statusRoomData.data.getStatusRoom.statusRoomUsers.items;
      if (statusRoomUserIds[0].userID === userId) {
        setMyStatusRoomUserId(statusRoomUserIds[0].id);
        setContactStatusRoomUserId(statusRoomUserIds[1].id);
        // get Last statuses
        const myLastStatusData = await API.graphql(
          graphqlOperation(
            getStatusRoomUser, {
              id: statusRoomUserIds[0].id
            }
          )
        )
        const contactLastStatusData = await API.graphql(
          graphqlOperation(
            getStatusRoomUser, {
              id: statusRoomUserIds[1].id
            }
          )
        )
        setMyLastStatus(myLastStatusData.data.getStatusRoomUser.lastStatus.content);
        setMyLastStatusTime(myLastStatusData.data.getStatusRoomUser.lastStatus.createdAt);
        setContactLastStatus(contactLastStatusData.data.getStatusRoomUser.lastStatus.content);
        setContactLastStatusTime(contactLastStatusData.data.getStatusRoomUser.lastStatus.createdAt);
      } else {
        setMyStatusRoomUserId(statusRoomUserIds[1].id);
        setContactStatusRoomUserId(statusRoomUserIds[0].id);
        // get Last statuses
        const myLastStatusData = await API.graphql(
          graphqlOperation(
            getStatusRoomUser, {
              id: statusRoomUserIds[1].id
            }
          )
        )
        const contactLastStatusData = await API.graphql(
          graphqlOperation(
            getStatusRoomUser, {
              id: statusRoomUserIds[0].id
            }
          )
        )
        setMyLastStatus(myLastStatusData.data.getStatusRoomUser.lastStatus.content);
        setMyLastStatusTime(myLastStatusData.data.getStatusRoomUser.lastStatus.createdAt);
        setContactLastStatus(contactLastStatusData.data.getStatusRoomUser.lastStatus.content);
        setContactLastStatusTime(contactLastStatusData.data.getStatusRoomUser.lastStatus.createdAt);
      }
    };
    getLastStatuses();
  }, [])

  // determine user ID of other user
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
  
  // onClick, navigate to the status update screen of that user
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
            {contactLastStatus}
          </Text>
          <Text style={style.lastUpdate}>
            {'Last Updated:\n'}
            {moment(contactLastStatusTime).format('MM/DD/YY, h:mm a')}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={style.userStatusContainer}>
          <Text style={style.userStatus}>
            {'Status: '}
            {myLastStatus}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StatusListItem;