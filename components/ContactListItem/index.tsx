import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { User } from '../../types';
import style from './style';
import { useNavigation } from '@react-navigation/native';

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();
  
  const onClick = () => {
    // navigate to status update page for this contact
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={style.container}>
        <View style={style.leftContainer}>
          <Image source= {{ uri: user.imageUri }} style={style.avatar} />
          <View>
            <Text style={style.userName}>{user.name}</Text>
            <Text style={style.publicMessage}>{user.publicMessage}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;