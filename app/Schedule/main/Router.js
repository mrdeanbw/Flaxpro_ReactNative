import React from 'react';
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text
}from 'react-native'
import { Router, Reducer, Scene,Actions,ActionConst } from 'react-native-router-flux';
import {Constants} from "../common"
import Pages from '../pages';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const createReducer = params => {
  const defaultReducer = new Reducer(params);

  return (state, action) => {
    return defaultReducer(state, action);
  }
};

class AppRouter extends React.Component {

  constructor(){
    super()
    this.state = {
      index: 1,
      routes: [
        { key: '1', title: 'EXPLORE', icon:require('../../Assets/images/icon/ic_explore_tab.png') },
        { key: '2', title: 'CLIENTS',icon:require('../../Assets/images/icon/ic_client_tab.png') },
        { key: '3', title: 'INBOX',icon:require('../../Assets/images/icon/ic_inbox_tab.png') },
        { key: '4', title: 'PROFILE',icon:require('../../Assets/images/icon/ic_profile_tab@2x.png') },
        { key: '5', title: 'ACCOUNT',icon:require('../../Assets/images/icon/ic_account_tab.png') },
      ],
    }
  }

  _handleChangeTab = index => this.setState({ index });

  _renderIcon = ({ route }) => {
    return <Image source={route.icon} style={[styles.iconTabbar,route.key=="2" && {width:40,height:20},route==this.state.routes[this.state.index] && {tintColor:Constants.APP_COLOR}]} />
  };


  _renderBadge = ({ route }) => {
    if (route.key === '3') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>5</Text>
        </View>
      );
    }
    return null;
  };

  _renderLabel = ({ route }) => {
      return (
          <Text style={[styles.label,route==this.state.routes[this.state.index] && {color:Constants.APP_COLOR}]}>{route.title}</Text>
      );
  };

  _renderFooter = props => (
    <TabBar {...props}
      renderIcon={this._renderIcon}
      renderBadge={this._renderBadge}
      renderLabel={this._renderLabel}
      style={{backgroundColor:"white",height:49}}
      pressColor={Constants.APP_COLOR}
      renderIndicator={()=>null}/>
  )

  _renderScene = SceneMap({
    '1': Pages.EmptyScreen,
    '2': Pages.Clients,
    '3': Pages.EmptyScreen,
    '4': Pages.EmptyScreen,
    '5': Pages.EmptyScreen,
  });

  render() {
    return (
      <TabViewAnimated
        style={{flex:1}}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }

}

const styles = StyleSheet.create({
  iconTabbar:{
    width:20,
    height:20,
    resizeMode:"contain"
  },
  badge: {
    marginTop: 4,
    marginRight: 22,
    backgroundColor: Constants.APP_COLOR,
    height: 12,
    width: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
    backgroundColor:"transparent"
  },
  label:{
    fontSize:11,
    textAlign:"center",
    color:"black",
    marginTop:3
  }
});
module.exports = AppRouter;
