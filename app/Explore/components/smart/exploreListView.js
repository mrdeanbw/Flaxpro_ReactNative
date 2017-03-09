import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AnimatedViewCell from './animatedViewCell';
import BottomBar from './bottomBar';

const { width, height } = Dimensions.get('window');
const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = (width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW)) / 3;

const avatar = require('../../../Assets/avatar.png');

const coach_markers = [
  {
    id: 0,
    amount: 99,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 4,
    name: "Emily Joe",
    description: "4 years experience independent",
  },
  {
    id: 1,
    amount: 199,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
  },
  {
    id: 2,
    amount: 285,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
  },
  {
    id: 3,
    amount: 390,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 4,
    name: "John Smith",
    description: "15 years experience independent",
  },
  {
    id: 5,
    amount: 99,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 4,
    name: "Emily Joe",
    description: "4 years experience independent",
  },
  {
    id: 6,
    amount: 199,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
  },
  {
    id: 7,
    amount: 285,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
  },
  {
    id: 8,
    amount: 390,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 4,
    name: "John Smith",
    description: "15 years experience independent",
  },
  {
    id: 9,
    amount: 99,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 4,
    name: "Emily Joe",
    description: "4 years experience independent",
  },
  {
    id: 10,
    amount: 199,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
  },
  {
    id: 11,
    amount: 285,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
  },
  {
    id: 12,
    amount: 390,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 4,
    name: "John Smith",
    description: "15 years experience independent",
  },
  {
    id: 13,
    amount: 199,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 5,
    name: "Mark Carter",
    description: "5 years experience independent",
  },
  {
    id: 14,
    amount: 285,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 5,
    name: "John Smith",
    description: "8 years experience independent",
  },
  {
    id: 15,
    amount: 390,
    avatar: avatar,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    rating: 4,
    name: "John Smith",
    description: "15 years experience independent",
  },
];

export default class ExploreListView extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: dataSource.cloneWithRows(coach_markers),
    };

    this.onList = this.onList.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'explore_request') {

    } else if (newProps.status == 'explore_success') {

    } else if (newProps.status == 'explore_error') {

    }
  }

  renderRow(rowData, sectionID, rowID) {

    return (
      <AnimatedViewCell
        key={ rowData.id }
        style={ [styles.item, ] }
        avatar={ rowData.avatar }
        width={ rowData.width }
        height={ rowData.height }
        rating={ rowData.rating }
        name={ rowData.name }
        description={ rowData.description }
        amount={ rowData.amount }
        onPress={ () => this.onClickAnimatedViewCell() }
      />
    );
  }
  onList() {

    if ( this.props.onList ) {
      this.props.onList();
    }
  }

  onFilter() {

    if (this.props.onFilter) {
      this.props.onFilter();
    }
  }

  onClickAnimatedViewCell() {
    
    // alert("onClickCell");
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <ListView
          pageSize = { coach_markers.length }
          dataSource={ this.state.dataSource }
          renderRow={ this.renderRow.bind(this) }
          contentContainerStyle={ styles.list }
        />

        <View style={ styles.mainContentContainer }>
          <BottomBar
            onList={ () => this.onList() }
            onFilter={ () => this.onFilter() }
            listType={ false }
          />
        </View>

      </View>
    );
  }
}

ExploreListView.propTypes = {

  onFilter: PropTypes.func,
  onList: PropTypes.func,
};

ExploreListView.defaultProps = {
  mapStandardMode: true,
  onFilter: () => {},
  onList: () => {},

};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#efefef',
  },
  list: {
    flexDirection:'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 50,
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    marginHorizontal: ITEM_SPACING / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
  },
  mainContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,
  },


});