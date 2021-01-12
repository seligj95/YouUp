import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import TagUpdate from '../components/TagUpdate';
import StatusInputBox from '../components/StatusInputBox';
import TagInputBox from '../components/TagInputBox/input';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { onCreateStatus, onCreateTag, onDeleteTag } from '../graphql/subscriptions';
import ClearStatusButton from '../components/ClearStatusButton';
import { getStatusRoom } from '../graphql/queries';

const UserStatusUpdateScreen = () => {
  // this gives the status room ID
  const route = useRoute();

  // setting const
  const [statuses, setStatuses] = useState([]);
  const [tags, setTags] = useState([]);
  const [userLastStatus, setUserLastStatus] = useState('');
  const [userLastStatusTime, setUserLastStatusTime] = useState('');
  const [otherUserLastStatus, setOtherUserLastStatus] = useState('');
  const [otherUserLastStatusTime, setOtherUserLastStatusTime] = useState('');

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
    setStatuses(statusRoomData.data.getStatusRoom.statuses.items);

    function sortByDate(t1, t2) {
      var t1_date = new Date(t1.createdAt)
      var t2_date = new Date(t2.createdAt)
      return t2_date - t1_date;
    }

    // create status arrarys for users
    // sort array so that latest status is in index 0
    const statusData = statusRoomData.data.getStatusRoom.statuses.items;
    let userStatuses = statusData.filter(item => item.userID === userId);
    let otherUserStatuses = statusData.filter(item => item.userID !== userId);
    
    let userStatusesSorted = userStatuses.sort(sortByDate);
    let otherUserStatusesSorted = otherUserStatuses.sort(sortByDate);
    setUserLastStatus(userStatusesSorted[0].content);
    setUserLastStatusTime(userStatusesSorted[0].createdAt);
    setOtherUserLastStatus(otherUserStatusesSorted[0].content);
    setOtherUserLastStatusTime(otherUserStatusesSorted[0].createdAt);

    // create array of tags for authenticated user, sort by createdAt
    const tagData = statusRoomData.data.getStatusRoom.tags.items;
    let userTags = tagData.filter(item => item.userID === userId);
    let userTagsSorted = userTags.sort(sortByDate);
    setTags(userTagsSorted);
  };

  useEffect(() => {
    getLastStatuses();
  }, [])

  // subscription for last statuses
  useEffect(() => {
    const subsctiption = API.graphql(
      graphqlOperation(onCreateStatus)
    ).subscribe({
      next: (data) => {
        const newStatus = data.value.data.onCreateStatus;
        if (newStatus.statusRoomID !== route.params.id) {
          // ********update this so you are only subscribed to the specific room you are in
          console.log('status is in another room')
          return;
        }
        setStatuses([newStatus, ...statuses]);
        getLastStatuses();
      }
    });
    return () => subsctiption.unsubscribe();
  }, [statuses]);

  // subscription for tag creation
  useEffect(() => {
    const subsctiption = API.graphql(
      graphqlOperation(onCreateTag)
    ).subscribe({
      next: (data) => {
        const newTag = data.value.data.onCreateTag;
        if (newTag.statusRoomID !== route.params.id) {
          // ********update this so you are only subscribed to the specific room you are in
          console.log('tag is in another room')
          return;
        }
        setTags([newTag, ...tags]);
        getLastStatuses();
      }
    });
    return () => subsctiption.unsubscribe();
  }, [tags]);

  // subscription for tag deletion
  useEffect(() => {
    const subsctiption = API.graphql(
      graphqlOperation(onDeleteTag)
    ).subscribe({
      next: (data) => {
        const deletedTag = data.value.data.onDeleteTag;
        if (deletedTag.statusRoomID !== route.params.id) {
          // ********update this so you are only subscribed to the specific room you are in
          console.log('tag is in another room')
          return;
        }
        setTags([...tags]);
        getLastStatuses();
      }
    });
    return () => subsctiption.unsubscribe();
  }, [tags]);

  return (
    <React.Fragment>
      <View>
        <Text>{'Your status is set to: '}{userLastStatus}</Text>
        <Text>{userLastStatusTime}</Text>
        <Text>{'Contact status is set to: '}{otherUserLastStatus}</Text>
        <Text>{otherUserLastStatusTime}</Text>
        <StatusInputBox statusRoomID={route.params.id}/>
        <FlatList
          style={{width: '100%'}}
          data={tags}
          renderItem={({ item }) => <TagUpdate tag={item} />}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        />
        <TagInputBox />
      </View>
      <ClearStatusButton />
    </React.Fragment>
  );
}

export default UserStatusUpdateScreen;
