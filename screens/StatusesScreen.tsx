import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import StatusListItem from '../components/StatusListItem';
import statusItems from '../data/StatusItems'

export default function StatusesScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
        style={{width: '100%'}}
        data={statusItems} 
        renderItem={({ item }) => <StatusListItem statusItem={item} />}
        keyExtractor={(item) => item.id}
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
