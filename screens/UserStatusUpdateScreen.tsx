import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import tags from '../data/Tags';
import StatusUpdate from '../components/StatusUpdate';
import TagUpdate from '../components/TagUpdate';
import StatusInputBox from '../components/StatusInputBox';
import TagInputBox from '../components/TagInputBox/input';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getStatusRoomData } from './queries'
import { getStatusRoomUser } from '../graphql/queries';
import { onUpdateStatusRoomUser } from '../graphql/subscriptions';
import DeleteStatusRoomButton from '../components/DeleteStatusRoomButton';

const UserStatusUpdateScreen = () => {
  // this gives the status room ID
  const route = useRoute();

  // setting const
  const [myStatusRoomUserId, setMyStatusRoomUserId] = useState('');
  const [contactStatusRoomUserId, setContactStatusRoomUserId] = useState('');
  const [myLastStatus, setMyLastStatus] = useState('');
  const [contactLastStatus, setContactLastStatus] = useState('');

  useEffect(() => {
    // query to get authenicated user's status room user ID
    const getLastStatuses = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userId = userInfo.attributes.sub;

      const statusRoomData = await API.graphql(
        graphqlOperation(
          getStatusRoomData, {
            id: route.params.id
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
        setContactLastStatus(contactLastStatusData.data.getStatusRoomUser.lastStatus.content);
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
        setContactLastStatus(contactLastStatusData.data.getStatusRoomUser.lastStatus.content);
      }
    };
    getLastStatuses();
  }, [])

  // subscription for last statuses
  // **********NEED TO UPDATE THIS TO SET THE LAST STATUS FOR THE CORRECT USER
  useEffect(() => {
    const subsctiption = API.graphql(
      graphqlOperation(onUpdateStatusRoomUser)
    ).subscribe({
      next: (data) => {
        const newStatus = data.value.data.onUpdateStatusRoomUser;
        if (newStatus.statusRoomID !== route.params.id) {
          // ********update this so you are only subscribed to the specific room you are in
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
