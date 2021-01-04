import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ShoutOutInputBox from '../components/ShoutOutInputBox';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser} from './queries'

export default function ShoutOutScreen() {

  const [shoutOut, setShoutOut] = useState('');

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

  return (
    <View>
      <Text>
        {shoutOut
          ? `Your current ShoutOut is set to: ${shoutOut}`
          : 'You have not set a ShoutOut'}
      </Text>
      <ShoutOutInputBox />
    </View>
  );
}


