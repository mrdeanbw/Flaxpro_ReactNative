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
import FilterForm from './Explore/components/smart/filterForm';
import ProposeTerms from './Hire/containers/proposeTerms';
import Payment from './Hire/containers/payment';
import Clients_Coaches from './Clients_Coaches/containers/clients_coaches';
import ScheduleForm from './Profile/components/smart/scheduleForm';
import ClientProfile from './Profile/containers/clientProfile';
import TrainerProfile from './Profile/containers/trainerProfile';
import EditProfile from './Profile/components/smart/editProfile';
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
    <Scene key="FilterForm" component={ FilterForm } direction="vertical" />
    <Scene key="ProposeTerms" component={ ProposeTerms } />
    <Scene key="Payment" component={ Payment } />
    <Scene key="Clients_Coaches" component={ Clients_Coaches } />
    <Scene key="ScheduleForm" component={ ScheduleForm } />
    <Scene key="ClientProfile" component={ ClientProfile } />
    <Scene key="TrainerProfile" component={ TrainerProfile } />
    <Scene key="ChatForm" component={ ChatForm } />
    <Scene key="EditProfile" component={ EditProfile }/>
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
