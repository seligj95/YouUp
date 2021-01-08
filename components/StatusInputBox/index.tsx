import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import style from './style';
import { FontAwesome } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createStatus, updateStatusRoomUser, deleteStatus, updateUser } from '../../graphql/mutations';
import { getStatusRoomData } from '../../screens/queries';

const StatusInputBox = (props) => {
  const { statusRoomID } = props;
  const [status, setStatus] = useState('');
  const [myUserId, setMyUserId] = useState(null);
  const [myStatusRoomUserID, setMyStatusRoomUserID] = useState('');
  const [myLastStatusID, setMyLastStatusID] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchStatusRoomUserID = async () => {
      try {
        const statusRoomData = await API.graphql(
          graphqlOperation(
            getStatusRoomData, {
              id: statusRoomID
            }
          )
        )
        
        var dataUserId = statusRoomData.data.getStatusRoom.statusRoomUsers.items;
        console.log(dataUserId)
        //THIS LOGIC ISN'T WORKING, SAME ISSUE AS USER STATUS UPDATE SCREEN
        if (dataUserId[0].userID === myUserId) {
          setMyStatusRoomUserID(dataUserId[0].id);
          setMyLastStatusID(dataUserId[0].lastStatus.id);
          console.log('if is true')
        } else {
          setMyStatusRoomUserID(dataUserId[1].id);
          setMyLastStatusID(dataUserId[1].lastStatus.id);
          console.log('else is true')
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchStatusRoomUserID();
  }, []);

  const updateLastUserStatus = async (statusId: string) => {
    try {
     await API.graphql(
        graphqlOperation(
          updateStatusRoomUser, {
            input: {
              id: myStatusRoomUserID,
              lastStatusID: statusId,
            }
          }
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  const deleteLastStatus = async () => {
    try {
      await API.graphql(
        graphqlOperation(
          deleteStatus, {
            input: {
              id: myLastStatusID
            }
          }
        )
      );
      console.log('deleting', myLastStatusID)
    } catch (e) {
      console.log(e)
    }
  }

  const onSendPress = async () => {
    try {
      const newStatusData = await API.graphql(
        graphqlOperation(
          createStatus, {
            input: {
              content: status,
              userID: myUserId,
              statusRoomID,
            }
          }
        )
      );
      deleteLastStatus();
      await updateLastUserStatus(newStatusData.data.createStatus.id);
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
      console.log()
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