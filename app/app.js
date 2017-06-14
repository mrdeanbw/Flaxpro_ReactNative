import React, {Component} from 'react';
import {BackHandler} from "react-native"
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux';

import * as reducers from './reducers';
import Auth from './Auth/containers/auth';
import ClientInfo from './Question/containers/clientInfo';
import ProfessionalInfo from './Question/containers/professionalInfo';
import WhoAreYou from './Question/containers/whoAreYou';
import Main from './Main/containers/main';
import ExploreMapView from './Explore/components/smart/exploreMapView';
import FilterClientForm from './Explore/components/smart/filterClientForm';
import FilterProfessionalForm from './Explore/components/smart/filterProfessionalForm';
import Contract from './Hire/containers/contract';
import Payment from './Hire/containers/payment';
import ScheduleForm from './Profile/components/smart/scheduleForm';
import ViewProfile from './Profile/containers/viewProfile';
import EditProfile from './Profile/containers/editProfile';
import Sessions from './Profile/components/smart/sessions';
import ChatForm from './Inbox/components/smart/chatForm';
import UI_static from './Schedule/pages/Clients';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="Auth" component={ Auth } type={ ActionConst.REST } />
    <Scene key="ClientInfo" component={ ClientInfo } />
    <Scene key="ProfessionalInfo" component={ ProfessionalInfo } />
    <Scene key="WhoAreYou" component={ WhoAreYou } />
    <Scene key="Main" component={ Main } />
    <Scene key="ExploreMapView" component={ ExploreMapView } />
    <Scene key="FilterClientForm" component={ FilterClientForm } direction="vertical" />
    <Scene key="FilterProfessionalForm" component={ FilterProfessionalForm } direction="vertical" />
    <Scene key="Contract" component={ Contract } />
    <Scene key="Payment" component={ Payment } />
    <Scene key="Clients_Professionals" component={ UI_static } />
    <Scene key="ScheduleForm" component={ ScheduleForm } />
    <Scene key="ViewProfile" component={ ViewProfile } />
    <Scene key="ChatForm" component={ ChatForm } />
    <Scene key="EditProfile" component={ EditProfile }/>
    <Scene key="Sessions" component={ Sessions }/>
  </Scene>
);

export default class App extends Component {
  // componentDidMount(){
  //   BackHandler.addEventListener('hardwareBackPress', function() {
  //     return true;
  //   });
  // }
  render() {
    return (
      <Provider store={ store }>
        <Router hideNavBar={ true } scenes={ scenes }/>
      </Provider>
    );
  }
}
