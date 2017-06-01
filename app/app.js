import React, {Component} from 'react';
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
import ProposeTerms from './Hire/containers/proposeTerms';
import Payment from './Hire/containers/payment';
import Clients_Professionals from './Clients_Professionals/containers/clients_professionals';
import ScheduleForm from './Profile/components/smart/scheduleForm';
import ClientProfile from './Profile/containers/clientProfile';
import ProfessionalProfile from './Profile/containers/professionalProfile';
import EditProfile from './Profile/components/smart/editProfile';
import Sessions from './Profile/components/smart/sessions';
import ChatForm from './Inbox/components/smart/chatForm';

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
    <Scene key="ProposeTerms" component={ ProposeTerms } />
    <Scene key="Payment" component={ Payment } />
    <Scene key="Clients_Professionals" component={ Clients_Professionals } />
    <Scene key="ScheduleForm" component={ ScheduleForm } />
    <Scene key="ClientProfile" component={ ClientProfile } />
    <Scene key="ProfessionalProfile" component={ ProfessionalProfile } />
    <Scene key="ChatForm" component={ ChatForm } />
    <Scene key="EditProfile" component={ EditProfile }/>
    <Scene key="Sessions" component={ Sessions }/>
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
