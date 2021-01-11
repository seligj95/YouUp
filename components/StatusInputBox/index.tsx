import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import style from './style';
import { FontAwesome } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createStatus, deleteStatus } from '../../graphql/mutations';
import { getStatusRoom } from '../../graphql/queries';

const StatusInputBox = (props) => {
  const { statusRoomID } = props;
  const [status, setStatus] = useState('');
  const [myId, setMyId] = useState(null);
  const [statusToDelete, setStatusToDelete] = useState('');



  useEffect(() => {
    // query to get authenicated user's ID
    const getId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    };
    getId();
  }, []);

  // useEffect(() => {
  //   const getStatusToDelete = async () => {
  //     // query to get authenicated user's id
  //     const userInfo = await Auth.currentAuthenticatedUser();
  //     const userId = userInfo.attributes.sub;

  //     // get statuses from status room
  //     const statusRoomData = await API.graphql(
  //       graphqlOperation(
  //         getStatusRoom, {
  //           id: statusRoomID
  //         }
  //       )
  //     )
  //     // create status arrarys for user
  //     // sort array so that new status is in index 0
  //     // index 1 should be the status that is to be deleted
  //     const statusData = statusRoomData.data.getStatusRoom.statuses.items;
  //     let userStatuses = statusData.filter(item => item.userID === userId);
      
  //     function sortStatuses(t1, t2) {
  //       var t1_date = new Date(t1.createdAt)
  //       var t2_date = new Date(t2.createdAt)
  //       return t2_date - t1_date;
  //     }
      
  //     let userStatusesSorted = userStatuses.sort(sortStatuses);
  //     setStatusToDelete(userStatusesSorted[1].content);
  //   };
  //   getStatusToDelete();
  // }, [])

  // delete previous last status for authenticated user
  // const deleteLastStatus = async () => {
  //   try {
  //     await API.graphql(
  //       graphqlOperation(
  //         deleteStatus, {
  //           input: {
  //             id: statusToDelete
  //           }
  //         }
  //       )
  //     );
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

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
      // await deleteLastStatus();
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