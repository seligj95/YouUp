import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import tags from '../data/Tags';
import StatusUpdate from '../components/StatusUpdate';
import TagUpdate from '../components/TagUpdate';
import StatusInputBox from '../components/StatusInputBox';
import TagInputBox from '../components/TagInputBox/input';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { statusesByStatusRoom } from '../graphql/queries';

const UserStatusUpdateScreen = () => {
  const route = useRoute();

  const [statuses, setStatuses] = useState([]);
  const [myId, setMyId] = useState(null);
  
  useEffect(() => {
    const fetchStatuses = async () => {
      const statusesData = await API.graphql(
        graphqlOperation(
          statusesByStatusRoom, {
            statusRoomID: route.params.id,
            sortDirection: 'DESC',
          }
        )
      )
      setStatuses(statusesData.data.statusesByStatusRoom.items);
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

  return (
    <View>
      <FlatList 
        style={{width: '100%'}}
        data={statuses} 
        renderItem={({ item }) => <StatusUpdate myId={myId} status={item} />}
        contentContainerStyle={{
          flexDirection: 'row'
        }}
      />
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
  );
}

export default UserStatusUpdateScreen;
