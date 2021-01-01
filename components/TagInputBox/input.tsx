import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import style from './style';
import { AntDesign } from '@expo/vector-icons';

const TagInputBox = () => {
  const [tag, addTag] = useState('');

  const onSendPress = () => {
    console.warn(`Sending: ${tag}`)

    // send tag to the backend
    
    addTag('');
}

  const onPress = () => {
    if (!tag) {
      null;
    } else {
      onSendPress();
    }
  };

  return (
    <View style={style.container}>
      <View style={style.mainContainer}>
        <TextInput 
          style={style.textInput} 
          multiline
          placeholder={'Add Tag'}
          placeholderTextColor='white'
          value={tag}
          onChangeText={addTag}
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
  )
};

export default TagInputBox;