import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const readMark = require('../../../Assets/images/notification_read_mark.png');

const { width, height } = Dimensions.get('window');

export default class InboxListCell extends Component {

  static propTypes = {
    index: PropTypes.number,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    avatar: PropTypes.object.isRequired,
    read: PropTypes.bool,    
    group: PropTypes.array,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    read: true,
    group: [],
    onClick: () => {}
  }

  constructor(props) {

    super(props);
    this.onClick = this.onClick.bind(this);

  }

  onClick() {

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  showAvatar(avatar, read, group) {

    if (group.length == 0) {
      return (
        <View style={ styles.avatarContainer }>
          <Image 
            style={ styles.imageAvatar } 
            source={ avatar }
            defaultSource={ require('../../../Assets/images/avatar.png') }
          />
          {
            read == false ? <Image style={ styles.imageReadMark } source={ readMark }/> : null
          }
        </View>
      );
    }

    return (
      <View style={ [styles.avatarContainer, { width: 30 * group.length + 10 }] }>
        {
          group.map((item, index) => {
            return (
              (index == 0) 
              ?
                <Image 
                  key={ index } 
                  style={ styles.imageAvatar }
                  source={ item.avatar }
                  defaultSource={ require('../../../Assets/images/avatar.png') }
                />
              :
                <Image 
                  key={ index } 
                  style={ [styles.imageGroupAvatar, { right : 30 * index }] } 
                  source={ item.avatar }
                  defaultSource={ require('../../../Assets/images/avatar.png') }
                />
            );
          })
        }
        {
          read == false ? <Image style={ styles.imageReadMark } source={ readMark }/> : null
        }
      </View>
    );    
  }

  render() {
    const {
      height,
      width,
      index,
      name,
      time,
      message,
      avatar,
      read,
      group,
      onClick,      
    } = this.props;

    return (
      <TouchableHighlight onPress={ () => onClick() }>
        <View style={ [styles.cellContainer, read ? { backgroundColor: '#f6f6f6' } : { backgroundColor: '#fff' }] }>
          { this.showAvatar(avatar, read, group) }
          <View style={ styles.infoContainer }>
            <Text style={ styles.textName }>{ name }</Text>
            <Text numberOfLines={ 2 } style={ styles.textMessage }>{ message }</Text>
          </View>
          <View style={ styles.timeContainer }>
            <Ionicons                
                name="ios-time-outline"  
                size={ 20 }
                color="#565656"
                style={{ paddingTop: 2 }}
              />
              <Text style={ styles.textTime }>{ time }</Text>
          </View>  
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    padding: 10,
    height: 70,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  imageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,    
  },
  imageReadMark: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textName: {
    color: '#4d4d4d',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textMessage: {
    flex: 1,
    color: '#858585',
    fontSize: 13,
  },
  textTime: {
    color: '#858585',
    fontSize: 12,
    paddingLeft: 5,
  },
  timeContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageGroupAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
  },

});
