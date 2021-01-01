import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';


function ShoutOutScreen() {
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
  return (
    <View style={styles.container}>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
    </View>
  );
}

export default withAuthenticator(ShoutOutScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
