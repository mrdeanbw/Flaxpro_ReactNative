import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import {
  user_client as roleClient,
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
  FONT_STYLES as fontStyles
} from '../../../Components/commonConstant';

import AnimatedViewCell from './animatedViewCell';
import BottomBar from './bottomBar';

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

  renderRow(rowData, sectionID, rowID) {
    return (
      <AnimatedViewCell
        key={ rowData.id }
        style={ [styles.item] }
        avatar={ rowData.avatar }
        width={ ITEM_WIDTH }
        height={ ITEM_WIDTH }
        rating={ rowData.rating }
        name={ rowData.name }
        description={ rowData.description }
        experience={ rowData.experience }
        amount={ rowData.price }
        onPress={ () => this.onClickAnimatedViewCell(rowData) }
        user={ this.props.user }
        profession={ rowData.profession }
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
   Actions.ViewProfile({ editable: false, user: rowData });
  }

  render() {
    const { selectedProfessionName } = this.props;

    this.state = {
      dataSource: this.dataSource.cloneWithRows(this.props.professionalsClients),
    };
    let errorMessage = '';
    switch (true) {
      case this.props.user.role === roleClient && !selectedProfessionName :
        errorMessage = 'Nothing selected - please select a profession';
        break;
      case this.props.user.role === roleClient && selectedProfessionName && selectedProfessionName !== 'All' :
        errorMessage = `No ${selectedProfessionName} found`;
        break;
      default: errorMessage = `We couldn't find anybody that match those criteria`;
    }

    return (
      <View style={ styles.container }>
        {this.props.professionalsClients.length>0 ?
          <ListView
            pageSize = { this.props.professionalsClients.length }
            dataSource={ this.state.dataSource }
            renderRow={ this.renderRow.bind(this) }
            contentContainerStyle={ styles.list }
          />
          :
          <View>
            <Text style={ styles.textSectionTitle }>{errorMessage}</Text>
          </View>
        }

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
  textSectionTitle: {
    fontFamily: 'Open Sans',
    color: '#6b6b6b',
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 20,
    textAlign: 'center',
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