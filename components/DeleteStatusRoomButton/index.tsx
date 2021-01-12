import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import style from './style';
import { 
  deleteStatusRoomUser, 
  deleteStatusRoom, 
  deleteStatus, 
  deleteTag 
} from '../../graphql/mutations';
import { getStatusRoom } from '../../graphql/queries';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';


const DeleteStatusRoomButton = () => {
  const route = useRoute();
  const statusRoomId = route.params.id;
  const navigation = useNavigation();

  const [statuses, setStatuses] = useState([]);
  const [tags, setTags] = useState([]);
  const [statusRoomUserIds, setStatusRoomUserIds] = useState([]);
  
  // fetch status room data
  const getStatusRoomData = async () => {
    const statusRoomData = await API.graphql(
      graphqlOperation(
        getStatusRoom, {
          id: statusRoomId
        }
      )
    );

    // create arrays for items to delete
    const roomData = statusRoomData.data.getStatusRoom;
    setStatuses(roomData.statuses.items);
    setTags(roomData.tags.items);
    setStatusRoomUserIds(roomData.statusRoomUsers.items);

    console.log('statuses: ', roomData.statuses.items)
    console.log('tags: ', roomData.tags.items)
    console.log('ids: ', roomData.statusRoomUsers.items)
  };
  
  useEffect(() => {
    getStatusRoomData();
  }, [])  

  // *******NOT WORKING**********
  // delete status room
  const deleteStatusRoomMutation = async () => {
    try {
      const statusRoomDeletion = await API.graphql(
        graphqlOperation(
          deleteStatusRoom, {
            input: {
              id: statusRoomId
            }
          }
        )
      );
      console.log('delete room: ', statusRoomId);
    } catch (e) {
      console.log(e);
    }
  };
  
  // delete status room users
  const deleteStatusRoomUsers = async () => {
    var user;
    for (user in statusRoomUserIds) {
      try {
        const statusRoomUserDeletion = await API.graphql(
          graphqlOperation(
            deleteStatusRoomUser, {
              input: {
                id: statusRoomUserIds[user].id
              }
            }
          )
        );
        console.log('deleting room user: ', statusRoomUserIds[user].id);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // delete statuses for room
  const deleteStatuses = async () => {
    var status;
    for (status in statuses) {
      try {
        const statusesDeletion = await API.graphql(
          graphqlOperation(
            deleteStatus, {
              input: {
                id: statuses[status].id
              }
            }
          )
        );
        console.log('deleting status: ', statuses[status].id);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // delete tags for room
  const deleteTags = async () => {
    var tag;
    for (tag in tags) {
      try {
        const tagsDeletion = await API.graphql(
          graphqlOperation(
            deleteTag, {
              input: {
                id: tags[tag].id
              }
            }
          )
        );
        console.log('deleting tag: ', tags[tag].id);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const navigateHome = () => {
    navigation.navigate('Statuses');
  };

  const onPress = () => {
    navigateHome();
    deleteStatusRoomMutation();
    deleteStatusRoomUsers();
    deleteStatuses();
    deleteTags();
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPress}>
          <AntDesign name="delete" size={28} color="white" />
      </TouchableOpacity>
    </View>

  )
};

export default DeleteStatusRoomButton;