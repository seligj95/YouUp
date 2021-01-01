import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import StatusListItem from '../components/StatusListItem';
import statusItems from '../data/StatusItems';

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

export default function StatusesScreen(this: any) {
  return (
    <View style={styles.container}>
      <FlatList 
        style={{width: '100%'}}
        data={statusItems} 
        renderItem={({ item }) => <StatusListItem statusItem={item} />}
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
