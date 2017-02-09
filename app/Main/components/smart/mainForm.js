import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
// import ExploreForm from '../../../Explore/components/smart/exploreForm';
import Explore from '../../../Explore/containers/explore';


const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const exploreIcon = require('../../../Assets/explore.png');
const exploreSelectedIcon = require('../../../Assets/selected_explore.png');
const coachesIcon = require('../../../Assets/coaches.png');
const coachesSelectedIcon = require('../../../Assets/selected_coaches.png');
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
  }

  render() {
    const {status} = this.props;

    return (
      <View style={ styles.container }>
        <TabNavigator>
          <TabNavigator.Item
              selected={ this.state.selectedTab === 'explore' }
              title="EXPLORE"
              renderIcon={ () => <Image source={ exploreIcon } style={ styles.iconTabbar1 }/> }
              renderSelectedIcon={ () => <Image source={ exploreSelectedIcon } style={ styles.iconTabbar1 }/> }
              onPress={ () => this.setState({ selectedTab: 'explore' }) }>
              <Explore/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={ this.state.selectedTab === 'coaches' }
              title="COACHES"
              renderIcon={ () => <Image source={ coachesIcon } style={ styles.iconTabbar2 }/> }
              renderSelectedIcon={ () => <Image source={ coachesSelectedIcon } style={ styles.iconTabbar2 }/> }
              onPress={ () => this.setState({selectedTab: 'coaches' }) }>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={ this.state.selectedTab === 'inbox' }
              title="INBOX"
              renderIcon={ () => <Image source={ inboxIcon } style={ styles.iconTabbar1 }/> }
              renderSelectedIcon={ () => <Image source={ inboxSelectedIcon } style={ styles.iconTabbar1 }/> }
              badgeText={ this.state.badge }
              onPress={ () => this.setState({selectedTab: 'inbox' }) }>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={ this.state.selectedTab === 'profile' }
              title="PROFILE"
              renderIcon={ () => <Image source={ profileIcon } style={ styles.iconTabbar3 }/> }
              renderSelectedIcon={ () => <Image source={ profileSelectedIcon } style={ styles.iconTabbar3 }/> }
              onPress={ () => this.setState({selectedTab: 'profile' }) }>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={ this.state.selectedTab === 'account' }
              title="ACCOUNT"
              renderIcon={ () => <Image source={ accountIcon } style={ styles.iconTabbar1 }/> }
              renderSelectedIcon={ () => <Image source={ accountSelectedIcon } style={ styles.iconTabbar1 }/> }
              onPress={ () => this.setState({selectedTab: 'account' }) }>
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
  iconTabbar1: {
    height: 25,
    width: 25,
  },
  iconTabbar2: {
    height: 25,
    width: 33,
  },
  iconTabbar3: {
    height: 29,
    width: 25,
  },

});
