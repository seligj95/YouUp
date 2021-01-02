import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import style from './style';
import { AntDesign } from '@expo/vector-icons';

const ShoutOutInputBox = () => {
  const [shoutOut, setShoutOut] = useState('');

  const onSendPress = () => {
    console.warn(`Setting shoutout to: ${shoutOut}`)

    // send shoutout to the backend
    
    setShoutOut('');
}

  const onPress = () => {
    if (!shoutOut) {
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
          placeholder={'Set New ShoutOut...'}
          placeholderTextColor='grey'
          value={shoutOut}
          onChangeText={setShoutOut}
        />
      </View>
      {!shoutOut ? null :
        <TouchableOpacity onPress={onPress}>
          <View style={style.buttonContainer}>
            <AntDesign name="notification" size={24} color="white" />
          </View>
        </TouchableOpacity>
      }
    </View>
  )
};

export default ShoutOutInputBox;