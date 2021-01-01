import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import users from '../data/Users';
import { listUsers } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: 80,
        }}
      />
    );
  };

export default function ContactsScreen(this: any) {
  return (
    <View style={styles.container}>
      <FlatList 
        style={{width: '100%'}}
        data={users} 
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

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
