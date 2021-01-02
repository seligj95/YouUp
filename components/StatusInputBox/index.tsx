import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import style from './style';
import { FontAwesome } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createStatus } from '../../graphql/mutations';

const StatusInputBox = (props) => {
  const { statusRoomID } = props;
  const [status, setStatus] = useState('');
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    fetchUser();
  }, []);

  const onSendPress = async () => {
    // send status to the backend
    try {
      await API.graphql(
        graphqlOperation(
          createStatus, {
            input: {
              content: status,
              userID: myUserId,
              statusRoomID,
            }
          }
        )
      )
    } catch (e) {
      console.log(e);
    }
    
    setStatus('');
}

  const onPress = () => {
    if (!status) {
      null;
    } else {
      onSendPress();
    }
  };

  return (
    <View style={style.container}>
      <View style={style.mainContainer}>
        <TextInput 
          style={style.textInput} 
          multiline
          placeholder={'Set New Status'}
          placeholderTextColor='grey'
          value={status}
          onChangeText={setStatus}
        />
      </View>
      {!status ? null :
        <TouchableOpacity onPress={onPress}>
          <View style={style.buttonContainer}>
            <FontAwesome name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      }
    </View>
  )
};

export default StatusInputBox;