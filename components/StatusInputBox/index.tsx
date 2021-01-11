import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import style from './style';
import { FontAwesome } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createStatus } from '../../graphql/mutations';

const StatusInputBox = (props) => {
  const { statusRoomID } = props;
  const [status, setStatus] = useState('');
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
              content: status,
              userID: myId,
              statusRoomID,
            }
          }
        )
      );
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
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{width: '100%'}}
    >
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
    </KeyboardAvoidingView>
  )
};

export default StatusInputBox;