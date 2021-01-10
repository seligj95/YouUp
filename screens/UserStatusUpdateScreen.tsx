import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import tags from '../data/Tags';
import TagUpdate from '../components/TagUpdate';
import StatusInputBox from '../components/StatusInputBox';
import TagInputBox from '../components/TagInputBox/input';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { onCreateStatus } from '../graphql/subscriptions';
import DeleteStatusRoomButton from '../components/DeleteStatusRoomButton';
import { getStatusRoom } from '../graphql/queries';

const UserStatusUpdateScreen = () => {
  // this gives the status room ID
  const route = useRoute();

  // setting const
  const [statuses, setStatuses] = useState([]);
  const [userLastStatus, setUserLastStatus] = useState('');
  const [userLastStatusTime, setUserLastStatusTime] = useState('');
  const [otherUserLastStatus, setOtherUserLastStatus] = useState('');
  const [otherUserLastStatusTime, setOtherUserLastStatusTime] = useState('');

  useEffect(() => {
    const getLastStatuses = async () => {
      // query to get authenicated user's id
      const userInfo = await Auth.currentAuthenticatedUser();
      const userId = userInfo.attributes.sub;

      // get statuses from status room
      const statusRoomData = await API.graphql(
        graphqlOperation(
          getStatusRoom, {
            id: route.params.id
          }
        )
      )
      setStatuses(statusRoomData.data.getStatusRoom.statuses);
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
      // let userStatusesSorted = userStatuses.sort(function (a, b){
      //   var c = new Date(a.createdAt);
      //   var d = new Date(b.createdAt);
      //   return d-c;
      // });
      // let otherUserStatusesSorted = otherUserStatuses.sort(function (a, b){
      //   var c = new Date(a.createdAt);
      //   var d = new Date(b.createdAt);
      //   return d-c;
      // });
      
      let userStatusesSorted = userStatuses.sort(sortStatuses);
      let otherUserStatusesSorted = otherUserStatuses.sort(sortStatuses);
      setUserLastStatus(userStatusesSorted[0].content);
      setUserLastStatusTime(userStatusesSorted[0].createdAt);
      setOtherUserLastStatus(otherUserStatusesSorted[0].content);
      setOtherUserLastStatusTime(otherUserStatusesSorted[0].createdAt);
      console.log(userStatuses);
      console.log(otherUserStatuses);
    };
    getLastStatuses();
  }, [])

  // subscription for last statuses
  // **********NEED TO UPDATE THIS TO SET THE LAST STATUS FOR THE CORRECT USER
  // useEffect(() => {
  //   const subsctiption = API.graphql(
  //     graphqlOperation(onCreateStatus)
  //   ).subscribe({
  //     next: (data) => {
  //       const newStatus = data.value.data.onCreateStatus;
  //       if (newStatus.statusRoomID !== route.params.id) {
  //         // ********update this so you are only subscribed to the specific room you are in
  //         console.log('status is in another room')
  //         return;
  //       }
  //       setStatuses([newStatus, ...statuses]);
  //     }
  //   });
  //   return () => subsctiption.unsubscribe();
  // }, [statuses])

  return (
    <React.Fragment>
      <View>
        <Text>{userLastStatus}</Text>
        <Text>{otherUserLastStatus}</Text>
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
