import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import Explore from '../../../Explore/containers/explore';
import Account from '../../../Account/containers/account';
import Schedule from '../../../Contracts/containers/contracts';
import ViewProfile from '../../../Profile/containers/viewProfile';
import Inbox from '../../../Inbox/containers/inbox';

import * as CommonConstant from '../../../Components/commonConstant';
import { tabs } from '../../constants';

const { width, height } = Dimensions.get('window');

const exploreIcon = require('../../../Assets/images/explore.png');
const exploreSelectedIcon = require('../../../Assets/images/selected_explore.png');
const professionalsIcon = require('../../../Assets/images/professionals.png');
const professionalsSelectedIcon = require('../../../Assets/images/selected_professionals.png');
const clientsIcon = require('../../../Assets/images/clients.png');
const clientsSelectedIcon = require('../../../Assets/images/selected_clients.png');
const inboxIcon = require('../../../Assets/images/inbox.png');
const inboxSelectedIcon = require('../../../Assets/images/selected_inbox.png');
const profileIcon = require('../../../Assets/images/profile.png');
const profileSelectedIcon = require('../../../Assets/images/selected_profile.png');
const accountIcon = require('../../../Assets/images/account.png');
const accountSelectedIcon = require('../../../Assets/images/selected_account.png');


class MainForm extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content', false);
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  checkProfile(){
    const { auth: { user }, profile, getFullProfile } = this.props;
    if(user._id !== profile.user._id) getFullProfile();
  }

  render() {
    const { auth: {user} } = this.props;
    let tabNavigator = [
      /* Explore */
      {
        title: "EXPLORE",
        selected: this.props.main.selectedTab === tabs.EXPLORE,
        renderIcon: () => (<Image source={ exploreIcon } style={ styles.iconTabbarGeneral }/>),
        renderSelectedIcon: () => (<Image source={ exploreSelectedIcon } style={ styles.iconTabbarGeneral }/>),
        onPress: () => { this.props.updateTab(tabs.EXPLORE) },
        children: <Explore/>,
      },
      /* smart or Professional */
      {
        title: user.role === CommonConstant.user_client ? "PROS" : "CLIENTS",
        selected: this.props.main.selectedTab === tabs.CLIENT_PRO,
        renderIcon: () => (
          <Image source={ user.role === CommonConstant.user_client ? professionalsIcon : clientsIcon }
                 style={ user.role === CommonConstant.user_client ? styles.iconTabbarProfessionals : styles.iconTabbarClients }/>
        ),
        renderSelectedIcon: () => (
          <Image source={ user.role === CommonConstant.user_client ? professionalsSelectedIcon : clientsSelectedIcon }
                 style={ user.role === CommonConstant.user_client ? styles.iconTabbarProfessionals : styles.iconTabbarClients }/>
        ),
        onPress: () => { this.props.updateTab(tabs.CLIENT_PRO) },
        children: <Schedule/>,
      },
      /* Inbox */
      {
        title: "INBOX",
        selected: this.props.main.selectedTab === tabs.INBOX,
        renderIcon: () => (<Image source={ inboxIcon } style={ styles.iconTabbarGeneral }/>),
        renderSelectedIcon: () => (<Image source={ inboxSelectedIcon } style={ styles.iconTabbarGeneral }/>),
        onPress: () => { this.props.updateTab(tabs.INBOX) },
        badgeText: this.props.unreadChats,
        children: <Inbox/>,
      },
      /* Profile */
      {
        title: "PROFILE",
        selected: this.props.main.selectedTab === tabs.PROFILE,
        renderIcon: () => (<Image source={ profileIcon } style={ styles.iconTabbarProfile }/>),
        renderSelectedIcon: () => (<Image source={ profileSelectedIcon } style={ styles.iconTabbarProfile }/>),
        onPress: () => {
          this.props.updateTab(tabs.PROFILE);
          this.checkProfile();
        },
        children: <ViewProfile/>,
      },
      /* Account*/
      {
        title: "ACCOUNT",
        selected: this.props.main.selectedTab === tabs.ACCOUNT,
        renderIcon: () => (<Image source={ accountIcon } style={ styles.iconTabbarGeneral }/>),
        renderSelectedIcon: () => (<Image source={ accountSelectedIcon } style={ styles.iconTabbarGeneral }/>),
        onPress: () => { this.props.updateTab(tabs.ACCOUNT) },
        children: <Account/>,
      },
    ];
    return (
      <View style={ styles.container }>
        <TabNavigator
          tabBarStyle={ styles.tab }
        >
          {
            tabNavigator.map((tab, index) => (
              <TabNavigator.Item
                key={ index }
                selected={ tab.selected }
                title={ tab.title }
                badgeText={ tab.badgeText }
                renderIcon={ tab.renderIcon }
                renderSelectedIcon={ tab.renderSelectedIcon }
                onPress={ tab.onPress }>
                { tab.children }
              </TabNavigator.Item>
            ))
          }
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
  iconTabbarProfessionals: {
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
    paddingBottom: 3,
    paddingTop: 3,
    height: 52,
  },
});

export default MainForm;