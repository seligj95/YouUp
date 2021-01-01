import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import style from './style';
import { FontAwesome } from '@expo/vector-icons';

const StatusInputBox = () => {
  const [status, setStatus] = useState('');

  const onSendPress = () => {
    console.warn(`Sending: ${status}`)

    // send status to the backend
    
    setStatus('');
}

  const onPress = () => {
    if (!status) {
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
          placeholder={'Set New Status'}
          placeholderTextColor='grey'
          value={status}
          onChangeText={setStatus}
        />
      </View>
      {!status ? null :
        <TouchableOpacity onPress={onPress}>
          <View style={style.buttonContainer}>
            <FontAwesome name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      }
    </View>
  )
};

export default StatusInputBox;