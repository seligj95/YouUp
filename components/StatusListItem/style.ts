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
    width: '70%',
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
  contactNameContainer: {
    justifyContent: 'center',
    padding: 10,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  contactStatusContainer: {
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    width: '30%',
  },
  contactStatus: {
    fontSize: 16,
    color: '#DE5B6D',
  },
  lastUpdate: {
    fontSize: 10,
    color: '#B9D4D8' 
  },
  userStatusContainer: {
    justifyContent: 'center',
    width: '30%',
    alignContent: 'center',
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  userStatus: {
    fontSize: 16,
    color: '#F2A490' 
  }
});

export default style;