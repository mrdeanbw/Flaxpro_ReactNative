import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');
const background = require('../../../Assets/images/background.png');

//auth redux store
import * as authActions from '../../../Auth/actions';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bNotification: true,
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ProposeTermsRequest') {

    } else if (newProps.status == 'ProposeTermsSuccess') {

    } else if (newProps.status == 'ProposeTermsError') {

    }
  }

  onProfileInfo() {

  }

  onLogOut() {
    const { authActions: { logout } } = this.props;
    AsyncStorage.clear()
      .then(() => {
        logout();
        Actions.Auth();
      })
  }

  onPayment() {
    Actions.Payment({editable:true});
  }

  render() {
    const { auth: { user } } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.navBarContainer }>
            <Text style={ styles.textTitle }>Account</Text>
          </View>
          <View style={ styles.mainContainer }>
            <ScrollView>
              <View style={ styles.sectionContainer }>
                <Text style={ styles.textSectionTitle }>PROFILE</Text>
              </View>
              <TouchableOpacity
                onPress={ () => this.onProfileInfo() }
                style={ styles.cellContainer }
              >
                <Text style={ styles.textCellTitle }>Profile info</Text>
                <EntypoIcons
                  name="chevron-thin-right"  size={ 15 }
                  color="#707070"
                />
              </TouchableOpacity>
              <View style={ styles.cellContainer }>
                <Text style={ styles.textCellTitle }>Email</Text>
                <Text style={ styles.textCellValue }>{ user.email }</Text>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ styles.textCellTitle }>Password</Text>
              </View>
              <TouchableOpacity
                onPress={ () => this.onPayment() }
                style={ styles.cellContainer }
              >
                <Text style={ styles.textCellTitle }>Payment</Text>
              </TouchableOpacity>
              <View style={ styles.cellContainer }>
                <Text style={ styles.textCellTitle }>Integrations</Text>
              </View>
              <View style={ styles.sectionContainer }>
                <Text style={ styles.textSectionTitle }>APP PREFERENCES</Text>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ styles.textCellTitle }>Language</Text>
                <Text style={ styles.textCellValue }>English</Text>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ styles.textCellTitle }>Notification</Text>
                <Switch
                  onValueChange={(value) => this.setState({ bNotification: value })}
                  value={ this.state.bNotification } />

              </View>
              <View style={ styles.cellContainer }>
                <Text style={ styles.textCellTitle }>Units</Text>
                <Text style={ styles.textCellValue }>Pounds, feet and inches</Text>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ styles.textCellTitle }>Sounds</Text>
              </View>

              <TouchableOpacity
                onPress={ () => this.onLogOut() }
                style={ styles.cellContainer }
              >
                <Text style={ styles.textCellTitle }>Log Out</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </Image>
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
  navBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textTitle: {
    flex: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    paddingVertical: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f6f8f9',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  textSectionTitle: {
    color: '#6b6b6b',
    fontSize: 12,
  },
  textCellTitle: {
    color: '#1e1e1e',
    fontSize: 14,
  },
  textCellValue: {
    color: '#707070',
    fontSize: 14,
  },
});

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({ authActions: bindActionCreators(authActions, dispatch) })
)(AccountForm);
