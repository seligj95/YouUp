import moment from 'moment';
import React from 'react';
import { View, Text } from 'react-native';
import { Status } from '../../types';
import style from './style';

export type StatusUpdateProps = {
  status: Status;
  myId: String;
};

const StatusUpdate = (props: StatusUpdateProps) => {
  const { status, myId } = props;

  const isUserStatus = () => {
    return status.user.id === myId;
  };

  return (
    <View style={style.container}>
      <View style={[
        style.statusBox, {
          backgroundColor: isUserStatus() ? '#B9D4DB' : '#F2A490',
          // marginLeft: isUserStatus() ? 50 : 0,
          // marginRight: isUserStatus() ? 0 : 50,
          width: '100%',
          flex: 1,
        }
      ]}>
        {isUserStatus() && 
          <Text style={style.status}>
            {'Your status is set to: '}{status.content}
          </Text>
        }
        {!isUserStatus() && 
          <Text style={style.status}>
            {status.user.name}{' is showing as: '}{status.content}
          </Text>
        }
        <Text style={style.time}>
          {'Last Updated: '}
          {moment(status.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  )
};

export default StatusUpdate;
