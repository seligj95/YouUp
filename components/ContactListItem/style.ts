import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center'
  },
  publicMessage: {
    fontSize: 16,
    color: 'grey',
  },
});

export default style;