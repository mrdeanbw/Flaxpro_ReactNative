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
import FilterClientForm from './Explore/components/smart/filterForms/clientFilterForm';
import FilterProfessionalForm from './Explore/components/smart/filterForms/professionalFilterForm';
import Contract from './Hire/containers/contract';
import Payment from './Hire/containers/payment';
import SummaryAcceptForm from './Hire/containers/summaryAccept';
import ScheduleForm from './Profile/components/smart/scheduleForm';
import EditAvailability from './Profile/components/smart/editAvailabilityForm';
import ViewProfile from './Profile/containers/viewProfile';
import EditProfile from './Profile/containers/editProfile';
import Sessions from './Profile/components/smart/sessions';
import ChatForm from './Inbox/containers/chat';
import Contracts from './Contracts/containers/contracts';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
export const store = createStoreWithMiddleware(reducer);

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="Auth" panHandlers={null} component={ Auth } type={ ActionConst.REST } />
    <Scene key="ClientInfo" component={ ClientInfo } />
    <Scene key="ProfessionalInfo" component={ ProfessionalInfo } />
    <Scene key="WhoAreYou" component={ WhoAreYou } />
    <Scene key="Main" panHandlers={null} component={ Main } />
    <Scene key="ExploreMapView" component={ ExploreMapView } />
    <Scene key="FilterClientForm" component={ FilterClientForm } direction="vertical" />
    <Scene key="FilterProfessionalForm" component={ FilterProfessionalForm } direction="vertical" />
    <Scene key="Contract" component={ Contract } />
    <Scene key="Payment" component={ Payment } />
    <Scene key="Contracts" component={ Contracts } />
    <Scene key="ScheduleForm" component={ ScheduleForm } />
    <Scene key="EditAvailability" component={ EditAvailability } />
    <Scene key="ViewProfile" component={ ViewProfile } />
    <Scene key="ChatForm" component={ ChatForm } />
    <Scene key="EditProfile" component={ EditProfile }/>
    <Scene key="Sessions" component={ Sessions }/>
    <Scene key="SummaryAcceptForm" component={ SummaryAcceptForm }/>
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