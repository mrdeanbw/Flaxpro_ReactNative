import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import Explore from '../../../Explore/containers/explore';
import Account from '../../../Account/containers/account';
import Clients_Coaches from '../../../Clients_Coaches/containers/clients_coaches';
import ClientProfile from '../../../Profile/containers/clientProfile';
import TrainerProfile from '../../../Profile/containers/trainerProfile';
import localStorage from 'react-native-local-storage';
import * as CommonConstant from '../../../Components/commonConstant';

const { width, height } = Dimensions.get('window');

const exploreIcon = require('../../../Assets/explore.png');
const exploreSelectedIcon = require('../../../Assets/selected_explore.png');
const coachesIcon = require('../../../Assets/coaches.png');
const coachesSelectedIcon = require('../../../Assets/selected_coaches.png');
const clientsIcon = require('../../../Assets/clients.png');
const clientsSelectedIcon = require('../../../Assets/selected_clients.png');
const inboxIcon = require('../../../Assets/inbox.png');
const inboxSelectedIcon = require('../../../Assets/selected_inbox.png');
const profileIcon = require('../../../Assets/profile.png');
const profileSelectedIcon = require('../../../Assets/selected_profile.png');
const accountIcon = require('../../../Assets/account.png');
const accountSelectedIcon = require('../../../Assets/selected_account.png');

export default class MainForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'explore',
      badge: 0,
    };

    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content', false);
    }
  }
  
  render() {
    // const { status, user_mode } = this.props;
    const user_mode = CommonConstant.user_trainer;

    return (
      <View style={ styles.container }>
        <TabNavigator
          tabBarStyle={ styles.tab }
        >
          {/* Explore */}
          <TabNavigator.Item
            selected={ this.state.selectedTab === 'explore' }
            title="EXPLORE"
            renderIcon={ () => <Image source={ exploreIcon } style={ styles.iconTabbarGeneral }/> }
            renderSelectedIcon={ () => <Image source={ exploreSelectedIcon } style={ styles.iconTabbarGeneral }/> }
            onPress={ () => this.setState({ selectedTab: 'explore' }) }>
            <Explore/>
          </TabNavigator.Item>

          {/* Clients or Coaches */}
          <TabNavigator.Item
            selected={ this.state.selectedTab === 'clients_coaches' }
            title={ user_mode === CommonConstant.user_client ? "COACHES" : "CLIENTS" }
            renderIcon={ () => <Image source={ user_mode === CommonConstant.user_client ? coachesIcon : clientsIcon } style={ user_mode === CommonConstant.user_client ? styles.iconTabbarCoaches : styles.iconTabbarClients }/> }
            renderSelectedIcon={ () => <Image source={ user_mode === CommonConstant.user_client ? coachesSelectedIcon : clientsSelectedIcon } style={ user_mode === CommonConstant.user_client ? styles.iconTabbarCoaches : styles.iconTabbarClients }/> }
            onPress={ () => this.setState({ selectedTab: 'clients_coaches' }) }>
            <Clients_Coaches/>
          </TabNavigator.Item>

          {/* Inbox */}
          <TabNavigator.Item
            selected={ this.state.selectedTab === 'inbox' }
            title="INBOX"
            renderIcon={ () => <Image source={ inboxIcon } style={ styles.iconTabbarGeneral }/> }
            renderSelectedIcon={ () => <Image source={ inboxSelectedIcon } style={ styles.iconTabbarGeneral }/> }
            badgeText={ this.state.badge }
            onPress={ () => this.setState({ selectedTab: 'inbox' }) }>
          </TabNavigator.Item>

          {/* Profile */}
          <TabNavigator.Item
            selected={ this.state.selectedTab === 'profile' }
            title="PROFILE"
            renderIcon={ () => <Image source={ profileIcon } style={ styles.iconTabbarProfile }/> }
            renderSelectedIcon={ () => <Image source={ profileSelectedIcon } style={ styles.iconTabbarProfile }/> }
            onPress={ () => this.setState({ selectedTab: 'profile' }) }>
            { user_mode === CommonConstant.user_client ? <ClientProfile/> : <TrainerProfile/> }
          </TabNavigator.Item>

          {/* Account */}
          <TabNavigator.Item
            selected={ this.state.selectedTab === 'account' }
            title="ACCOUNT"
            renderIcon={ () => <Image source={ accountIcon } style={ styles.iconTabbarGeneral }/> }
            renderSelectedIcon={ () => <Image source={ accountSelectedIcon } style={ styles.iconTabbarGeneral }/> }
            onPress={ () => this.setState({ selectedTab: 'account' }) }>
            <Account/>
          </TabNavigator.Item>

        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  iconTabbarGeneral: {
    height: 25,
    width: 25,
  },
  iconTabbarCoaches: {
    height: 25,
    width: 33,
  },
  iconTabbarClients: {
    height: 24,
    width: 43,
  },
  iconTabbarProfile: {
    height: 26,
    width: 22,
  },
  tab: {
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderTopColor: '#d7d7d7',
  },
});
