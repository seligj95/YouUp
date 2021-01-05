import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { getStatusRoom, statusesByStatusRoom } from '../../graphql/queries'
import { deleteStatusRoom, deleteStatusRoomUser, deleteStatus } from '../../graphql/mutations';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';

const DeleteStatusRoomButton = () => {
  const route = useRoute();

  const [statusRoomUsers, setStatusRoomUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchStatuses = async () => {
      const statusesData = await API.graphql(
        graphqlOperation(
          statusesByStatusRoom, {
            statusRoomID: route.params.id,
            sortDirection: 'DESC',
          }
        )
      )
      setStatuses(statusesData.data.statusesByStatusRoom.items);
    }
    fetchStatuses();
  }, [])
  // this is returning an empty array...
  useEffect(() => {
    const fetchStatusRoomUsers = async () => {
      const roomUsersData = await API.graphql(
        graphqlOperation(
          getStatusRoom, {
            input: {
              id: route.params.id,
            }
          }
        )
      )
      setStatusRoomUsers(roomUsersData.data.getStatusRoom.statusRoomUsers.items.id);
    }
    fetchStatusRoomUsers();
  }, [])

  const deleteStatusRoomOnPress = async () => {
    try {
      await API.graphql(
        graphqlOperation(
          deleteStatusRoom, {
            input: {
              id: route.params.id,
            }
          }
        )
      )
      console.log('deleting room: ', route.params.id)
    } catch (e) {
      console.log(e);
    }
  }

  const deleteStatusRoomUsers = async () => {
    try {
      var i;
      for (let i = 0; i < statusRoomUsers.length; i++) {
        await API.graphql(
          graphqlOperation(
            deleteStatusRoomUser, {
              input: {
                id: statusRoomUsers[i],
              }
            }
          )
        )
        console.log('deleting status room user: ', statusRoomUsers[i])
      }
    } catch (e) {
      console.log(e);
    }
  }

  const deleteStatuses = async () => {
    try {
      for (let i = 0; i < statuses.length; i++) {
        await API.graphql(
          graphqlOperation(
            deleteStatus, {
              input: {
                id: statuses[i],
              }
            }
          )
        )
        console.log('deleting status: ', statuses[i])
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onPress = () => {
    deleteStatusRoomOnPress();
    deleteStatusRoomUsers();
    deleteStatuses();
    console.log(statusRoomUsers);
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPress}>
          <FontAwesome5 name="users" size={28} color="white" />
      </TouchableOpacity>
    </View>

  )
};

export default DeleteStatusRoomButton;