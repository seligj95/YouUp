import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import statuses from '../data/Statuses';
import tags from '../data/Tags';
import StatusUpdate from '../components/StatusUpdate';
import TagUpdate from '../components/TagUpdate';

const UserStatusUpdateScreen = () => {
  const route = useRoute();
  // console.log(route.params)

  return (
    <View>
      <FlatList 
        style={{width: '100%'}}
        data={statuses.statuses} 
        renderItem={({ item }) => <StatusUpdate status={item} />}
      />
      <FlatList 
        style={{width: '100%'}}
        data={tags.tags} 
        renderItem={({ item }) => <TagUpdate tag={item} />}
      />
    </View>
  );
}

export default UserStatusUpdateScreen;
