import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import style from './style';
import { AntDesign } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createTag } from '../../graphql/mutations';
import { useRoute } from '@react-navigation/native';

const TagInputBox = (props) => {
  const route = useRoute();

  const [tag, setTag] = useState('');
  
  // onSendPress, create the tag for the user
  const onSendPress = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    const userId = userInfo.attributes.sub;

    try {
      const newTag = await API.graphql(
        graphqlOperation(
          createTag, {
            input: {
              content: tag,
              userID: userId,
              statusRoomID: route.params.id,
            }
          }
        )
      )
      console.log('created tag: ', newTag)
    } catch (e) {
      console.log(e);
    }
    setTag('');
  }

  const onPress = () => {
    if (!tag) {
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
            placeholder={'Add Tag'}
            placeholderTextColor='white'
            value={tag}
            onChangeText={setTag}
          />
        </View>
        {!tag ? null :
          <TouchableOpacity onPress={onPress}>
            <View style={style.buttonContainer}>
              <AntDesign name="tago" size={24} color="white" />
            </View>
          </TouchableOpacity>
        }
      </View>
    </KeyboardAvoidingView>
  )
};

export default TagInputBox;