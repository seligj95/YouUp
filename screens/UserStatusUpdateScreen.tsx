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
import { onCreateStatus } from '../graphql/subscriptions';
import DeleteStatusRoomButton from '../components/DeleteStatusRoomButton';

const UserStatusUpdateScreen = () => {
  const route = useRoute();

  // const [statuses, setStatuses] = useState([]);
  const [myId, setMyId] = useState(null);
  const [myLastStatus, setMyLastStatus] = useState('');
  const [contactLastStatus, setContactLastStatus] = useState('');
  
  // useEffect(() => {
  //   const fetchStatuses = async () => {
  //     const statusesData = await API.graphql(
  //       graphqlOperation(
  //         statusesByStatusRoom, {
  //           statusRoomID: route.params.id,
  //           sortDirection: 'DESC',
  //         }
  //       )
  //     )
  //     setStatuses(statusesData.data.statusesByStatusRoom.items);
  //   }
  //   fetchStatuses();
  // }, [])

  useEffect(() => {
    const fetchStatuses = async () => {
      const statusesData = await API.graphql(
        graphqlOperation(
          getStatusRoomLastStatuses, {
            id: route.params.id
          }
        )
      )
      if (statusesData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.userID === myId) {
        setMyLastStatus(statusesData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.content);
        setContactLastStatus(statusesData.data.getStatusRoom.statusRoomUsers.items[1].lastStatus.content);
      } else {
        setMyLastStatus(statusesData.data.getStatusRoom.statusRoomUsers.items[1].lastStatus.content);
        setContactLastStatus(statusesData.data.getStatusRoom.statusRoomUsers.items[0].lastStatus.content);
      }
    }
    fetchStatuses();
  }, [])

  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    }
    getMyId();
  }, [])

  // useEffect(() => {
  //   const subsctiption = API.graphql(
  //     graphqlOperation(onCreateStatus)
  //   ).subscribe({
  //     next: (data) => {
  //       const newStatus = data.value.data.onCreateStatus;
  //       if (newStatus.statusRoomID !== route.params.id) {
  //         //update this so you are only subscribed to the specific room you are in
  //         console.log('status is in another room')
  //         return;
  //       }
  //       setLastStatuses([newStatus, ...lastStatuses]);
  //     }
  //   });
  //   return () => subsctiption.unsubscribe();
  // }, [lastStatuses])

  return (
    <React.Fragment>
      <View>
        <Text>{myLastStatus}</Text>
        <Text>{contactLastStatus}</Text>
        {/* <FlatList 
          style={{width: '100%'}}
          data={lastStatuses} 
          renderItem={({ item }) => <StatusUpdate myId={myId} status={item} />}
          contentContainerStyle={{
            flexDirection: 'row'
          }}
        /> */}
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
