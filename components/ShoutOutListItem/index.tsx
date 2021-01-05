import React from 'react';
import { View, Text, Image } from 'react-native';
import { User } from '../../types';
import style from './style';

export type ShoutOutListItemProps = {
  user: User;
};

const ShoutOutListItem = (props: ShoutOutListItemProps) => {
  const { user } = props;

  return (
    <View style={style.container}>
      <View style={style.leftContainer}>
        <Image source= {{ uri: user.imageUri }} style={style.avatar} />
        <View>
          <Text style={style.userName}>{user.name}</Text>
          <Text style={style.shoutOut}>{user.shoutOut}</Text>
        </View>
      </View>
    </View>
  );
};

export default ShoutOutListItem;