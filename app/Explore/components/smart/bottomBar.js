import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

const propTypes = {
  style: PropTypes.object,
  onFilter: PropTypes.func,
  onList: PropTypes.func,
  mapType: PropTypes.bool,
};

const defaultTypes = {
  onFilter: () => {},
  onList: () => {},
  mapType: true,
}

const list = require('../../../Assets/images/list_white.png');
const filter = require('../../../Assets/images/filter_white.png');
const map = require('../../../Assets/images/map_white.png');

class BottomBar extends React.Component {
  constructor(props) {
    super(props);

    this.onFilter = this.onFilter.bind(this);
    this.onList = this.onList.bind(this);

  }

  onFilter () {

    if ( this.props.onFilter ) {
      this.props.onFilter();
    }
  }

  onList () {

    if ( this.props.onList ) {
      this.props.onList();
    }
  }

  render() {
    const { mapType } = this.props;

    let listTitle = "List";
    let listImage = list;

    if ( mapType ) {
      listTitle = "Map";
      listImage = map;
    }

    return (
      <View style={ [styles.bottomBarContainer, this.props.style] }>
        <TouchableOpacity
          onPress={ () => this.onList() }
          style={ styles.bottomBarButtonContainer }
        >
          <Text style={ styles.textListFilter }>{ listTitle }</Text>
          <Image source={ listImage } style={ styles.imageListFilter }/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => this.onFilter() }
          style={ styles.bottomBarButtonContainer }
        >
          <Text style={ styles.textListFilter }>Filter</Text>
          <Image source={ filter } style={ styles.imageListFilter }/>
        </TouchableOpacity>
      </View>
    );
  }
}

BottomBar.propTypes = propTypes;
BottomBar.default = defaultTypes;

const styles = StyleSheet.create({
  bottomBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#363f46',
    borderRadius: 20,

    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  bottomBarButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  imageListFilter: {
    height: 15,
    width: 17,
  },
  textListFilter: {
    backgroundColor: 'transparent',
    color: '#fff',
    alignSelf: 'center',
    paddingRight: 10,
  },
});

module.exports = BottomBar;
