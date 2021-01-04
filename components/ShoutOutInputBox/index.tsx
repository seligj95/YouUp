import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import style from './style';
import { AntDesign } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../graphql/mutations';

const ShoutOutInputBox = () => {
  const [shoutOut, setShoutOut] = useState('');
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    fetchUser();
  }, []);

  const onSendPress = async () => {
    try {
      const newShoutOut = await API.graphql(
        graphqlOperation(
          updateUser, {
            input: {
              id: myUserId,
              shoutOut
            }
          }
        )
      )
    } catch (e) {
      console.log(e);
    }
    
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