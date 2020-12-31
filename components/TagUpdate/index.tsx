import React from 'react';
import { Tag } from '../../types';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import style from './style';

export type TagUpdateProps = {
  tag: Tag;
};

const TagUpdate = (props: TagUpdateProps) => {
  const { tag } = props;

  // checks if this is a tag the user assigned to the contact
  const isContactTag = () => {
    return tag.user.id === 'u1';
  };

  return (
    <View>
      {isContactTag() && <Text>{tag.content}</Text>}
    </View>
  )
};

export default TagUpdate;