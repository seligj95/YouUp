import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import style from './style';
import { updateUser } from '../../graphql/mutations';
import { Auth, API, graphqlOperation } from 'aws-amplify';

const ClearShoutOutButton = () => {
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    fetchUser();
  }, []);

  const onPress = async () => {
    try {
      const clearShoutOut = await API.graphql(
        graphqlOperation(
          updateUser, {
            input: {
              id: myUserId,
              shoutOut: ""
            }
          }
        )
      )
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPress}>
          <FontAwesome name="undo" size={28} color="white" />
      </TouchableOpacity>
    </View>

  )
};

export default ClearShoutOutButton;