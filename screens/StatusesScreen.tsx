import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import StatusListItem from '../components/StatusListItem';
import statusItems from '../data/StatusItems';
import { listUsers } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import ContactsButton from '../components/ContactsButton';

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

export default function StatusesScreen(this: any) {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        setUsers(userData.data.listUsers.items);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, [])
  
  return (
    <View style={styles.container}>
      <FlatList 
        style={{width: '100%'}}
        data={statusItems} 
        renderItem={({ item }) => <StatusListItem statusItem={item} />}
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
