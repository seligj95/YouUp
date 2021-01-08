import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import tags from '../data/Tags';
import StatusUpdate from '../components/StatusUpdate';
import TagUpdate from '../components/TagUpdate';
import StatusInputBox from '../components/StatusInputBox';
import TagInputBox from '../components/TagInputBox/input';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getStatusRoomLastStatuses } from './queries'
import { onUpdateStatusRoomUser } from '../graphql/subscriptions';
import DeleteStatusRoomButton from '../components/DeleteStatusRoomButton';

const UserStatusUpdateScreen = () => {
  // this gives the status room ID
  const route = useRoute();

  // setting const
  const [myId, setMyId] = useState('');
  const [myLastStatus, setMyLastStatus] = useState('');
  const [contactLastStatus, setContactLastStatus] = useState('');

  // query to get authenicated user's ID
  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    }
    getMyId();
  }, [])

  // query to get authenticated user 

  useEffect(() => {
    const fetchStatuses = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();

      const statusesData = await API.graphql(
        graphqlOperation(
          getStatusRoomLastStatuses, {
            id: route.params.id
          }
        )
      )
      // THIS LOGIC ISN'T WORKING, SAME ISSUE AS STATUSINPUTBOX

      if (statusesData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.userID === userInfo.attributes.sub) {
        setMyLastStatus(statusesData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.content);
        setContactLastStatus(statusesData.data.getStatusRoom.statusRoomUsers.items[1].lastStatus.content);
      } else {
        setMyLastStatus(statusesData.data.getStatusRoom.statusRoomUsers.items[1].lastStatus.content);
        setContactLastStatus(statusesData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.content);
      }
      console.log('myid', userInfo.attributes.sub)
      console.log('myqueuryid', statusesData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.userID)
    }

    fetchStatuses();
  }, [])

  useEffect(() => {
    const subsctiption = API.graphql(
      graphqlOperation(onUpdateStatusRoomUser)
    ).subscribe({
      next: (data) => {
        const newStatus = data.value.data.onUpdateStatusRoomUser;
        if (newStatus.statusRoomID !== route.params.id) {
          //update this so you are only subscribed to the specific room you are in
          console.log('status is in another room')
          return;
        }
        setMyLastStatus([newStatus.lastStatus.content]);
      }
    });
    return () => subsctiption.unsubscribe();
  }, [myLastStatus])

  return (
    <React.Fragment>
      <View>
        <Text>{myLastStatus}</Text>
        <Text>{contactLastStatus}</Text>
        <StatusInputBox statusRoomID={route.params.id}/>
        <FlatList
          style={{width: '100%'}}
          data={tags.tags} 
          renderItem={({ item }) => <TagUpdate tag={item} />}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        />
        <TagInputBox />
      </View>
      <DeleteStatusRoomButton />
    </React.Fragment>
  );
}

export default UserStatusUpdateScreen;
