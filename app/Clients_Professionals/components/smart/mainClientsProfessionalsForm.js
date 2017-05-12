import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer';
import * as CommonConstant from '../../../Components/commonConstant';
import SearchBar from '../../../Components/searchBar';
import Clients_ProfessionalsForm from './clients_professionalsForm';
import Menu from './menu';

const { width, height } = Dimensions.get('window');
const background = require('../../../Assets/images/background.png');

export default class MainClientsProfessionalsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ClientsRequest') {

    } else if (newProps.status == 'ClientsSuccess') {

    } else if (newProps.status == 'ClientsError') {

    } else if (newProps.status == 'ProfessionalsRequest') {

    } else if (newProps.status == 'ProfessionalsSuccess') {

    } else if (newProps.status == 'ProfessionalsError') {

    }
  }

  onMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }
  onCloseMenu () {
    this.setState({ isMenuOpen: false });
  };
  
  onOpenMenu() {
    this.setState({ isMenuOpen: true });
  };

  onSelectMenuItem(item) {
    this.onCloseMenu ();
    alert(item);
  }

  render() {
    const { status } = this.props;

    return (
        <View style={ styles.container }>
          <Image source={ background } style={ styles.background } resizeMode="cover">
            <View style={ styles.navBarContainer }>
              <View style={ styles.searchBarWrapper }>
                <SearchBar
                  onSearchChange={ () => console.log('On Focus') }
                  height={ 25 }
                  autoCorrect={ false }
                  returnKeyType={ "search" }
                  iconColor={ "#ffffff99" }
                  placeholderColor="#ffffff99"
                />
              </View>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onMenu() }>
                <View style={ styles.menuWrapper }>
                  <Icons
                    name="menu"  size={ 40 }
                    color="#fff"
                  />
                </View>
              </TouchableOpacity>    
            </View>
            <Drawer
              ref={ (ref) => this.drawer = ref }
              open={ this.state.isMenuOpen }
              type="overlay"
              side="right"
              tapToClose={ true }
              styles={ {} }
              openDrawerOffset={ 0.5 }
              tweenHandler={ (ratio) => ({
                main: { opacity:(2 - ratio) / 2 }
              })}
              content={ <Menu onItemSelected={ (item) => this.onSelectMenuItem(item) }/> }
              onOpen={ () => this.onOpenMenu() }
              onClose={ () => this.onCloseMenu() }
            >
              <Clients_ProfessionalsForm/>
              
           </Drawer>

          </Image>
        </View>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
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
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  searchBarWrapper: {
    flex: 10,
    backgroundColor: 'transparent',
    marginLeft: 10,
    marginRight: 5,
    marginVertical: 6,
  },
  menuWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 5,
    marginRight: 10,
  },  
});
