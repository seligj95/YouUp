import React, { useState, useEffect } from 'react';
import { Tag } from '../../types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { deleteTag } from '../../graphql/mutations';
import { API, Auth, graphqlOperation } from 'aws-amplify';


import style from './style';

export type TagUpdateProps = {
  tag: Tag;
};

const TagUpdate = (props: TagUpdateProps) => {
  const { tag } = props;
  const [myId, setMyId] = useState(null);

  // query to get user id
  useEffect(() => {
    // query to get authenicated user's ID
    const getId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    };
    getId();
  }, []);

  // delete tag from backend on press
  const deleteContactTag = async () => {
    try {
      const deletingTag = await API.graphql(
        graphqlOperation(
          deleteTag, {
            input: {
              id: tag.id
            }
          }
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <React.Fragment>
        <View style={style.container}>
          <Text>{tag.content}</Text>
          <View style={style.deleteButton}>
            <TouchableOpacity onPress={deleteContactTag}>
              <Feather name="x-square" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
    </View>
  )
};

export default TagUpdate;