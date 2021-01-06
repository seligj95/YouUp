import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import { listUsers } from '../graphql/queries';
import { API, Auth, graphqlOperation } from 'aws-amplify';

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

export default function ContactsScreen(this: any) {
  
  const [users, setUsers] = useState([]);
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        setUsers(usersData.data.listUsers.items);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    fetchUser();
  }, []);

  const allUsersExceptMe = users.filter((item) => item.id !== myUserId);
  // filter out contacts who you have an existing status room with?
  // or keep and just navigate to that status room?
  const filteredUsers = allUsersExceptMe;

  return (
    <View style={styles.container}>
      <FlatList 
        style={{width: '100%'}}
        data={filteredUsers} 
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
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
