import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import style from './style';
import { createStatus } from '../../graphql/mutations';
import { useRoute } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';

const ClearStatusButton = () => {
  const route = useRoute();
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    // query to get authenicated user's ID
    const getId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    };
    getId();
  }, []);

  // on send press, create a status for user
  const onSendPress = async () => {
    try {
      const newStatusData = await API.graphql(
        graphqlOperation(
          createStatus, {
            input: {
              content: 'Status Not Set',
              userID: myId,
              statusRoomID: route.params.id
            }
          }
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onPress = () => {
    onSendPress();
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPress}>
          <FontAwesome name="undo" size={28} color="white" />
      </TouchableOpacity>
    </View>

  )
};

export default ClearStatusButton;