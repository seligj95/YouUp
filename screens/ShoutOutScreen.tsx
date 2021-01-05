import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import ShoutOutInputBox from '../components/ShoutOutInputBox';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser} from './queries'
import { onUpdateUser } from '../graphql/subscriptions';
import ClearShoutOutButton from '../components/ClearShoutOutButton';
import ShoutOutListItem from '../components/ShoutOutListItem';
import { listUsers } from '../graphql/queries';

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

export default function ShoutOutScreen() {

  const [shoutOut, setShoutOut] = useState('');
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchShoutOuts = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: userInfo.attributes.sub,
            }
          )
        )
        setShoutOut(userData.data.getUser.shoutOut)
      } catch (e) {
        console.log(e);
      }
    }
    fetchShoutOuts();
  }, [])

  useEffect(() => {
    const subsctiption = API.graphql(
      graphqlOperation(onUpdateUser)
    ).subscribe({
      next: (data) => {
        const newShoutOut = data.value.data.onUpdateUser.shoutOut;
        setShoutOut([newShoutOut]);
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
      }
    });
    return () => subsctiption.unsubscribe();
  }, [shoutOut])

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

  return (
    <React.Fragment>
      <View>
        <Text>
          {shoutOut
            ? `Your current ShoutOut is set to: ${shoutOut}`
            : 'You have not set a ShoutOut'}
        </Text>
        <ShoutOutInputBox />
      </View>
      <FlatList 
        style={{width: '100%'}}
        data={users} 
        renderItem={({ item }) => <ShoutOutListItem user={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
      <ClearShoutOutButton />
    </React.Fragment>
  );
}


