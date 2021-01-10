import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { StatusItem, User } from '../../types';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getStatusRoomData } from '../../screens/queries';
import { getStatusRoom } from '../../graphql/queries';

export type StatusListItemProps = {
  statusRoom: StatusItem;
};

const StatusListItem = (props: StatusListItemProps) => {
  // setting const
  const { statusRoom } = props;
  console.log(statusRoom)
  const [otherUser, setOtherUser] = useState(null);
  const [userLastStatus, setUserLastStatus] = useState('');
  const [userLastStatusTime, setUserLastStatusTime] = useState('');
  const [otherUserLastStatus, setOtherUserLastStatus] = useState('');
  const [otherUserLastStatusTime, setOtherUserLastStatusTime] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const getLastStatuses = async () => {
      // query to get authenicated user's id
      const userInfo = await Auth.currentAuthenticatedUser();
      const userId = userInfo.attributes.sub;

      // get statuses from status room
      const statusRoomData = await API.graphql(
        graphqlOperation(
          getStatusRoom, {
            id: statusRoom.id
          }
        )
      )

      // create status arrarys for users
      // sort array so that latest status is in index 0
      // set last status to lastest status
      const statusData = statusRoomData.data.getStatusRoom.statuses.items;
      let userStatuses = statusData.filter(item => item.userID === userId);
      let otherUserStatuses = statusData.filter(item => item.userID !== userId);
      
      function sortStatuses(t1, t2) {
        var t1_date = new Date(t1.createdAt)
        var t2_date = new Date(t2.createdAt)
        return t2_date - t1_date;
      }

      let userStatusesSorted = userStatuses.sort(sortStatuses);
      let otherUserStatusesSorted = otherUserStatuses.sort(sortStatuses);
      setUserLastStatus(userStatusesSorted[0].content);
      setUserLastStatusTime(userStatusesSorted[0].createdAt);
      setOtherUserLastStatus(otherUserStatusesSorted[0].content);
      setOtherUserLastStatusTime(otherUserStatusesSorted[0].createdAt);
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
            {otherUserLastStatus}
          </Text>
          <Text style={style.lastUpdate}>
            {'Last Updated:\n'}
            {moment(otherUserLastStatusTime).format('MM/DD/YY, h:mm a')}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={style.userStatusContainer}>
          <Text style={style.userStatus}>
            {'Status: '}
            {userLastStatus}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StatusListItem;