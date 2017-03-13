import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ClientCoachesListCell extends Component {

  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    index: PropTypes.number,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    width: width,
    height: 64,
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

  render() {
    const {
      height,
      width,
      index,
      name,
      date,
      location,
      avatar,
      onClick,
    } = this.props;

    return (
      <TouchableHighlight onPress={ () => onClick() }>
        <View style={ styles.cellContainer }>
          <View style={ styles.avatar_nameContainer }>
            <Image style={ styles.avatar } source={ avatar }/>
            <Text style={ styles.textName }>{ name }</Text>
          </View>
          <Text style={ styles.textDate }>{ date }</Text>
          <Text style={ styles.textLocation }>{ location }</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  avatar_nameContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textName: {
    color: '#4d4d4d',
    fontSize: 13,
    paddingLeft: 10,
  },
  textDate: {
    flex: 1,
    color: '#4d4d4d',
    fontSize: 13,
    textAlign: 'left',
  },
  textLocation: {
    flex: 1,
    color: '#4d4d4d',
    fontSize: 13,
    textAlign: 'right',
  },

});
