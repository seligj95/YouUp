import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import StatusListItem from '../components/StatusListItem';
import { getUser } from './queries';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import ContactsButton from '../components/ContactsButton';
import { onCreateStatusRoom, onDeleteStatusRoom } from '../graphql/subscriptions';

const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: 80,
        }}
      />
    );
  };

export default function StatusesScreen() {
  const [statusRooms, setStatusRooms] = useState([]);

  // fetching status room data
  const fetchStatusRooms = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const userData = await API.graphql(
        graphqlOperation(
          getUser, {
            id: userInfo.attributes.sub,
          }
        )
      )
      setStatusRooms(userData.data.getUser.statusRoomUser.items)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchStatusRooms();
  }, [])

  // subscription for status room creation
  // *** adding this caused crash when new status room created
  // useEffect(() => {
  //   const subsctiption = API.graphql(
  //     graphqlOperation(onCreateStatusRoom)
  //   ).subscribe({
  //     next: (data) => {
  //       const newStatusRoom = data.value.data.onCreateStatusRoom;
  //       setStatusRooms([newStatusRoom, ...statusRooms]);
  //       fetchStatusRooms();
  //     }
  //   });
  //   return () => subsctiption.unsubscribe();
  // }, [statusRooms])

  // subscription for onDeleteStatusRoom


  // subscription for status room updates? or should be on status list item?
  
  return (
    <View style={styles.container}>
      <FlatList 
        style={{width: '100%'}}
        data={statusRooms} 
        renderItem={({ item }) => <StatusListItem statusRoom={item.statusRoom} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
      <ContactsButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
