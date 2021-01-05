import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ShoutOutInputBox from '../components/ShoutOutInputBox';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser} from './queries'
import { onUpdateUser } from '../graphql/subscriptions';
import ClearShoutOutButton from '../components/ClearShoutOutButton';

export default function ShoutOutScreen() {

  const [shoutOut, setShoutOut] = useState('');
  //const [myId, setMyId] = useState(null);
  
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

  // useEffect(() => {
  //   const getMyId = async () => {
  //     const userInfo = await Auth.currentAuthenticatedUser();
  //     setMyId(userInfo.attributes.sub);
  //   }
  //   getMyId();
  // }, [])

  useEffect(() => {
    const subsctiption = API.graphql(
      graphqlOperation(onUpdateUser)
    ).subscribe({
      next: (data) => {
        const newShoutOut = data.value.data.onUpdateUser.shoutOut;
        setShoutOut([newShoutOut]);
      }
    });
    return () => subsctiption.unsubscribe();
  }, [shoutOut])

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
      <ClearShoutOutButton />
    </React.Fragment>
  );
}


