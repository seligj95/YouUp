import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import style from './style';
import { FontAwesome } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createStatus, updateStatusRoomUser, deleteStatus } from '../../graphql/mutations';
import { getStatusRoomData } from '../../screens/queries';
import { getStatusRoomUser } from '../../graphql/queries';

const StatusInputBox = (props) => {
  const { statusRoomID } = props;
  const [status, setStatus] = useState('');
  const [myId, setMyId] = useState(null);
  const [myStatusRoomUserId, setMyStatusRoomUserId] = useState('');
  const [myLastStatusId, setMyLastStatusId] = useState('');

  useEffect(() => {
    // query to get authenicated user's ID
    const getIds = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    };
    getIds();
  }, []);

  useEffect(() => {
    // query to get authenicated user's status room user ID
    const getLastStatusId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userId = userInfo.attributes.sub;

      const statusRoomData = await API.graphql(
        graphqlOperation(
          getStatusRoomData, {
            id: statusRoomID
          }
        )
      )
      // get authenticated user's status room user id
      const statusRoomUserIds = statusRoomData.data.getStatusRoom.statusRoomUsers.items;
      if (statusRoomUserIds[0].userID === userId) {
        setMyStatusRoomUserId(statusRoomUserIds[0].id);
        console.log('my stat room user id', statusRoomUserIds[0].id)

        // get user Last status ID
        const myLastStatusData = await API.graphql(
          graphqlOperation(
            getStatusRoomUser, {
              id: statusRoomUserIds[0].id
            }
          )
        )
        setMyLastStatusId(myLastStatusData.data.getStatusRoomUser.lastStatus.id);
        console.log('last status id', myLastStatusData.data.getStatusRoomUser.lastStatus.id)
      } else {
        setMyStatusRoomUserId(statusRoomUserIds[0].id);
        console.log('my stat room user id', statusRoomUserIds[0].id)

        // get user Last status ID
        const myLastStatusData = await API.graphql(
          graphqlOperation(
            getStatusRoomUser, {
              id: statusRoomUserIds[1].id
            }
          )
        )
        setMyLastStatusId(myLastStatusData.data.getStatusRoomUser.lastStatus.id);
        console.log('last status id', myLastStatusData.data.getStatusRoomUser.lastStatus.id)
      }
    };
    getLastStatusId();
    console.log('outside last status id', myLastStatusId)
    console.log('outside status room user id', myStatusRoomUserId)
  }, [])

  // update last status for authenticated user with content of status input box
  const updateLastUserStatus = async (statusId: string) => {
    console.log('outside', myLastStatusId)
    try {
     await API.graphql(
        graphqlOperation(
          updateStatusRoomUser, {
            input: {
              id: myStatusRoomUserId,
              lastStatusID: statusId,
            }
          }
        )
      );
    } catch (e) {
      console.log(e);
    }
    console.log('stat room user id', myStatusRoomUserId)
    console.log('statusid', statusId)
  }

  // delete previous last status for authenticated user
  const deleteLastStatus = async () => {
    try {
      await API.graphql(
        graphqlOperation(
          deleteStatus, {
            input: {
              id: myLastStatusId
            }
          }
        )
      );
    } catch (e) {
      console.log(e)
    }
    console.log('delete', myLastStatusId)
  }

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
      // delete previous last status
      deleteLastStatus();
      // update user with new last status
      await updateLastUserStatus(newStatusData.data.createStatus.id);
      console.log('outside myid', myId)
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