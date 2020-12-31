import moment from 'moment';
import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Status } from '../../types';
import style from './style';


export type StatusUpdateProps = {
  status: Status;
};

const StatusUpdate = (props: StatusUpdateProps) => {
  const { status } = props;

  const isUserStatus = () => {
    return status.user.id === 'u1';
  };

  return (
    <View style={style.container}>
      <View style={[
        style.statusBox, {
          backgroundColor: isUserStatus() ? '#B9D4DB' : '#F2A490',
          marginLeft: isUserStatus() ? 50 : 0,
          marginRight: isUserStatus() ? 0 : 50,
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
