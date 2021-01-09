import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { User } from '../../types';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createStatusRoom, createStatusRoomUser, createStatus} from '../../graphql/mutations';

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  //const [userStatusRooms, setUserStatusRooms] = useState([]);

  const navigation = useNavigation();


  
  const onClick = async () => {
    // navigate to status update page for this contact
    //check if status room already exists for this user. 
    //if so, navigate to that room instead of creating a new one
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      // query for status rooms for user

      // check if authenticated user already has room with user.id
      // if yes, navigate to that room, else create new room.

      // create new status room
      const newStatusRoomData = await API.graphql(
        graphqlOperation(
          createStatusRoom, {
            input: {
              id: (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 36))
            }
          }
        )
      )
      if (!newStatusRoomData.data) {
        console.log("Failed to create a status room");
        return;
      }

      const newStatusRoom = newStatusRoomData.data.createStatusRoom;
      // create new status and assign to last status for each user
      const initialLastStatusUser = await API.graphql(
        graphqlOperation(
          createStatus, {
            input: {
              content: 'Status Not Set',
              statusRoomID: newStatusRoom.id,
              userID: userInfo.attributes.sub
            }
          }
        )
      )

      const initialLastStatusContact = await API.graphql(
        graphqlOperation(
          createStatus, {
            input: {
              content: 'Status Not Set',
              statusRoomID: newStatusRoom.id,
              userID: user.id
            }
          }
        )
      )

      const initialUserLastStatusID = initialLastStatusUser.data.createStatus
      const initialContactLastStatusID = initialLastStatusContact.data.createStatus

      // add contact to status room
      const contactStatusRoomUser = await API.graphql(
        graphqlOperation(
          createStatusRoomUser, {
            input: {
              userID: user.id,
              statusRoomID: newStatusRoom.id,
              lastStatusID: initialContactLastStatusID.id
            }
          }
        )
      );

      // add authenticated user to status room
      const userStatusRoomUser = await API.graphql(
        graphqlOperation(
          createStatusRoomUser, {
            input: {
              userID: userInfo.attributes.sub,
              statusRoomID: newStatusRoom.id,
              lastStatusID: initialUserLastStatusID.id
            }
          }
        )
      );

      navigation.navigate('StatusUpdate', { 
        id: newStatusRoom.id, 
        name: user.name
      })

    } catch (e){
      console.log(e);
    }  
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={style.container}>
        <View style={style.leftContainer}>
          <Image source= {{ uri: user.imageUri }} style={style.avatar} />
          <View>
            <Text style={style.userName}>{user.name}</Text>
            <Text style={style.shoutOut}>{user.shoutOut}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;