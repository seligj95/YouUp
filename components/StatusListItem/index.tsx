import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { StatusItem } from '../../types';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getStatusRoomLastStatuses } from '../../screens/queries'

export type StatusListItemProps = {
  statusRoom: StatusItem;
};

const StatusListItem = (props: StatusListItemProps) => {
  const { statusRoom } = props;
  const [otherUser, setOtherUser] = useState(null);
  const [statusRoomData, setStatusRoomData] = useState([]);
  const [myLastStatus, setMyLastStatus] = useState('');
  const [myLastStatusTime, setMyLastStatusTime] = useState('');
  const [otherUserLastStatus, setOtherUserLastStatus] = useState('');
  const [otherUserLastStatusTime, setOtherUserLastStatusTime] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const statusData = await API.graphql(
          graphqlOperation(
            getStatusRoomLastStatuses, {
              id: statusRoom.id
            }
          )
        )
        if (statusData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.userID === userInfo.attributes.sub) {
          setMyLastStatus(statusData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.content);
          setMyLastStatusTime(statusData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.createdAt);
          setOtherUserLastStatus(statusData.data.getStatusRoom.statusRoomUsers.items[1].lastStatus.content);
          setOtherUserLastStatusTime(statusData.data.getStatusRoom.statusRoomUsers.items[1].lastStatus.createdAt);
        } else {
          setMyLastStatus(statusData.data.getStatusRoom.statusRoomUsers.items[1].lastStatus.content);
          setMyLastStatusTime(statusData.data.getStatusRoom.statusRoomUsers.items[1].lastStatus.createdAt);
          setOtherUserLastStatus(statusData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.content);
          setOtherUserLastStatusTime(statusData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.createdAt);
        };
        setStatusRoomData(statusData.data.getStatusRoom.statusRoomUsers.items);
      } catch (e) {
        console.log(e)
      }
    }
    fetchStatuses();
  }, [])

  if (!statusRoomData) {
    return null;
  }

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
            {statusRoomData
              ? `${otherUserLastStatus}`
              : ""}
          </Text>
          <Text style={style.lastUpdate}>
            {'Last Updated:\n'}
            {statusRoomData && moment(otherUserLastStatusTime).format('MM/DD/YY, h:mm a')}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={style.userStatusContainer}>
          <Text style={style.userStatus}>
            {'Status: '}
            {statusRoomData
              ? `${myLastStatus}`
              : ""}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StatusListItem;