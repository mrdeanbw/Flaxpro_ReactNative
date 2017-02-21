import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Actions, Scene, Router } from 'react-native-router-flux';

import * as reducers from './reducers';
import Login from './Auth/containers/login';
import ClientInfo from './Question/containers/clientInfo';
import WhoAreYou from './Question/containers/whoAreYou';
import Main from './Main/containers/main';
import ExploreMapView from './Explore/components/smart/exploreMapView';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="Login" component={ Login }/>
    <Scene key="ClientInfo" component={ ClientInfo } />
    <Scene key="WhoAreYou" component={ WhoAreYou } />
    <Scene key="Main" component={ Main } initial={ true }/>
    <Scene key="ExploreMapView" component={ ExploreMapView } />
  </Scene>
);

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router hideNavBar={ true } scenes={ scenes }/>
      </Provider>
    );
  }
}
