import React from 'react';
import { Tag } from '../../types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

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

  const deleteTag = () => {
    console.warn(`Deleting: ${tag.id}`)

    // delete tag from backend
  };

  return (
    <View>
      {isContactTag() && 
        <React.Fragment>
          <View style={style.container}>
            <Text>{tag.content}</Text>
            <View style={style.deleteButton}>
              <TouchableOpacity onPress={deleteTag}>
                <Feather name="x-square" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </React.Fragment>
      }
    </View>
  )
};

export default TagUpdate;