import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import style from './style';
import { FontAwesome } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createStatus, updateStatusRoomUser, deleteStatus } from '../../graphql/mutations';
import { getStatusRoom } from '../../graphql/queries';

const StatusInputBox = (props) => {
  const { statusRoomID } = props;
  const [status, setStatus] = useState('');
  const [myUserId, setMyUserId] = useState(null);
  const [myStatusRoomID, setMyStatusRoomID] = useState(null);
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
            getStatusRoom, {
              id: statusRoomID,
            }
          )
        )
        if (statusRoomData.data.getStatusRoom.statusRoomUsers.items[0].userId === myUserId) {
          setMyStatusRoomID(statusRoomData.data.getStatusRoom.statusRoomUsers.items[0].id);
          setMyLastStatusID(statusRoomData.data.getStatusRoom.statusRoomUsers.items[0].lastStatusID);
        } else {
          setMyStatusRoomID(statusRoomData.data.getStatusRoom.statusRoomUsers.items[1].id);
          setMyLastStatusID(statusRoomData.data.getStatusRoom.statusRoomUsers.items[1].lastStatusID);
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
              id: myStatusRoomID,
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
      console.log(myLastStatusID)
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
      console.log(newStatusData.data.createStatus.id)
      deleteLastStatus();
      await updateLastUserStatus(newStatusData.data.createStatus.id)
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