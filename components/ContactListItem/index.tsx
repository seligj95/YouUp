import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { User } from '../../types';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createStatusRoom, createStatusRoomUser } from '../../graphql/mutations';

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();
  
  const onClick = async () => {
    // navigate to status update page for this contact
    //check if status room already exists for this user. 
    //if so, navigate to that room instead of creating a new one
    try {
      // create new status room
      const newStatusRoomData = await API.graphql(
        graphqlOperation(
          createStatusRoom, { 
            input: {
              lastUserStatusID: "xxa63a1a-530e-4acc-aeb3-996258a74fab",
              lastContactStatusID: "zza63a1a-530e-4acc-aeb3-996258a74fab",
            }
          }
        )
      )

      if (!newStatusRoomData.data) {
        console.log("Failed to create a status room");
        return;
      }

      const newStatusRoom = newStatusRoomData.data.createStatusRoom;

      // add contact to status room
      const newUserStatusRoom = await API.graphql(
        graphqlOperation(
          createStatusRoomUser, {
            input: {
              userID: user.id,
              statusRoomID: newStatusRoom.id
            }
          }
        )
      )
      // add authenticated user to status room
      const userInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(
          createStatusRoomUser, {
            input: {
              userID: userInfo.attributes.sub,
              statusRoomID: newStatusRoom.id
            }
          }
        )
      )

      navigation.navigate('StatusUpdate', { 
        id: newStatusRoom.id, 
        name: "HardCoded Name",
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