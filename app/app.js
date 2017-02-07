import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import Login from './Auth/containers/login';
import ClientInfo from './Question/containers/clientInfo';
import WhoAreYou from './Question/containers/whoAreYou';



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <WhoAreYou />
      </Provider>
    );
  }
}
