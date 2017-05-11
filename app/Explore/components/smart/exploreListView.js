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

import { Actions } from 'react-native-router-flux';
import localStorage from 'react-native-local-storage';
import * as CommonConstant from '../../../Components/commonConstant';

import AnimatedViewCell from './animatedViewCell';
import BottomBar from './bottomBar';

const { width, height } = Dimensions.get('window');

const ITEM_SPACING = 10;
const ITEM_WIDTH = (width - (2 * ITEM_SPACING) - (2 * ITEM_SPACING)) / 3;

class ExploreListView extends Component {

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 });

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
        width={ ITEM_WIDTH }
        height={ ITEM_WIDTH }
        rating={ rowData.rating }
        name={ rowData.name }
        description={ rowData.description }
        amount={ rowData.amount }
        onPress={ () => this.onClickAnimatedViewCell(rowData) }
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

  onClickAnimatedViewCell(rowData) {
    console.log('rowData', rowData)

    // console.log('selectedCoacheClientIndex', this.props.coachesClients[])
    localStorage.get(CommonConstant.user_mode)
      .then((data) => {
        if (data == CommonConstant.user_client) {
          console.log('client')
          Actions.TrainerProfile({ editable: false, user: rowData });
          return;
        } else if (data == CommonConstant.user_trainer){
          console.log('professional')
          Actions.ClientProfile({ editable: false, user: rowData });
          return;
        }
      });

    // alert("onClickCell");
  }

  render() {
    const { status } = this.props;

    this.state = {
      dataSource: this.dataSource.cloneWithRows(this.props.coachesClients),
    };

    return (
      <View style={ styles.container }>
        <ListView
          pageSize = { this.props.coachesClients.length }
          dataSource={ this.state.dataSource }
          renderRow={ this.renderRow.bind(this) }
          contentContainerStyle={ styles.list }
        />

        <View style={ styles.mainContentContainer }>
          <BottomBar
            onList={ () => this.onList() }
            onFilter={ () => this.onFilter() }
            mapType={ true }
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

module.exports = ExploreListView;

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